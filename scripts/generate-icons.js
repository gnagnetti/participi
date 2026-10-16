import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) c = 0xedb88320 ^ (c >>> 1);
      else c = c >>> 1;
    }
    table[n] = c;
  }
  return table;
}

const crcTable = createCrcTable();
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function writeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function createPng(width, height, isMaskable = false) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(6, 9); // RGBA color
  ihdr.writeUInt8(0, 10);
  ihdr.writeUInt8(0, 11);
  ihdr.writeUInt8(0, 12);
  const ihdrChunk = writeChunk('IHDR', ihdr);

  // Generate pixels
  const rowBytes = 1 + width * 4;
  const rawData = Buffer.alloc(rowBytes * height);
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = width / 512;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowBytes;
    rawData[rowOffset] = 0; // Filter: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background color: slate-950 / dark indigo (#0f172a to #020617)
      let r = 15;
      let g = 23;
      let b = 42;
      let a = 255;

      // Inner glow ring
      if (dist < 180 * scale && dist > 140 * scale) {
        r = Math.min(255, r + 40);
        g = Math.min(255, g + 20);
        b = Math.min(255, b + 60);
      }

      // Draw Cyrillic letter "П" shape
      // "П" consists of:
      // - top horizontal bar: y between (centerY - 100*scale) and (centerY - 60*scale), x between (centerX - 90*scale) and (centerX + 90*scale)
      // - left vertical bar: y between (centerY - 100*scale) and (centerY + 90*scale), x between (centerX - 90*scale) and (centerX - 50*scale)
      // - right vertical bar: y between (centerY - 100*scale) and (centerY + 90*scale), x between (centerX + 50*scale) and (centerX + 90*scale)
      const inTopBar = (y >= centerY - 95 * scale && y <= centerY - 55 * scale) && (x >= centerX - 85 * scale && x <= centerX + 85 * scale);
      const inLeftBar = (y >= centerY - 95 * scale && y <= centerY + 85 * scale) && (x >= centerX - 85 * scale && x <= centerX - 48 * scale);
      const inRightBar = (y >= centerY - 95 * scale && y <= centerY + 85 * scale) && (x >= centerX + 48 * scale && x <= centerX + 85 * scale);

      // Bottom baseline tags
      const inBaseLeft = (y >= centerY + 75 * scale && y <= centerY + 88 * scale) && (x >= centerX - 95 * scale && x <= centerX - 38 * scale);
      const inBaseRight = (y >= centerY + 75 * scale && y <= centerY + 88 * scale) && (x >= centerX + 38 * scale && x <= centerX + 95 * scale);

      if (inTopBar || inLeftBar || inRightBar || inBaseLeft || inBaseRight) {
        // Gold gradient: #fbbf24 to #f59e0b
        const goldRatio = (y - (centerY - 100 * scale)) / (190 * scale);
        r = 245 + Math.floor(10 * (1 - goldRatio));
        g = 158 + Math.floor(33 * (1 - goldRatio));
        b = 11 + Math.floor(25 * (1 - goldRatio));
      } else if (dist < 120 * scale) {
        // Inner subtle amber glow
        r = Math.min(255, r + 25);
        g = Math.min(255, g + 20);
        b = Math.min(255, b + 15);
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const idatData = zlib.deflateSync(rawData);
  const idatChunk = writeChunk('IDAT', idatData);
  const iendChunk = writeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate the required PWA icons
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180));
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPng(64, 64));

console.log('Successfully generated all PWA icons in /public!');
