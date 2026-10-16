# Guida al Deploy su Cloudflare (Pages / Workers)

Questa applicazione è già **100% pre-configurata** per essere compilata e distribuita su **Cloudflare Pages** con supporto SPA (Single Page Application) e conformità completa PWA (Progressive Web App).

---

## 🚀 Metodo 1: Deploy Diretto da GitHub / GitLab (Consigliato)

1. Accedi alla dashboard di [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Vai su **Workers & Pages** → **Create application** → scheda **Pages** → **Connect to Git**.
3. Seleziona il tuo repository.
4. Nelle impostazioni di build, inserisci i seguenti parametri (già predisposti):
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (lascia vuoto o predefinito)
5. Nelle **Environment variables** (Variabili d'ambiente) di Cloudflare Pages, aggiungi:
   - `NODE_VERSION` = `20` (oppure `22`)
6. Clicca su **Save and Deploy**. In meno di 60 secondi il sito sarà online con dominio gratuito `.pages.dev` e certificato SSL/HTTPS automatico.

---

## 💻 Metodo 2: Deploy tramite Wrangler CLI (Terminale)

Se utilizzi la riga di comando sul tuo computer:

```bash
# 1. Installa le dipendenze
npm install

# 2. Compila l'applicazione per la produzione
npm run build

# 3. Effettua il login a Cloudflare (se non già fatto)
npx wrangler login

# 4. Pubblica la cartella dist/ su Cloudflare Pages
npx wrangler pages deploy dist --project-name=participi-russi
```

---

## 🛠️ Risoluzione Errore `Unknown lockfile version: bun.lock`

Se Cloudflare Pages mostrava:
```
error: Unknown lockfile version
at bun.lock:2:22
UnknownLockfileVersion: failed to parse lockfile: 'bun.lock'
error: lockfile had changes, but lockfile is frozen
```

### Perché si verifica l'errore:
1. **File `bun.lock` presente su Git**: Se in passato è stato eseguito un commit con `bun.lock` nel repository GitHub/GitLab, Cloudflare Pages rileva automaticamente la presenza di questo file e tenta di installare con `bun install --frozen-lockfile`.
2. **Incompatibilità versione**: La versione di Bun presente nell'ambiente Cloudflare (`bun@1.2.15`) non riconosce `lockfileVersion: 2` generato da versioni più recenti o convertito da npm.
3. **Cache delle dipendenze**: Cloudflare mantiene in cache le dipendenze della build precedente (`Restoring from dependencies cache`).

### I 2 passaggi per risolvere definitivamente:

#### Passaggio 1: Rimuovi `bun.lock` dal tuo repository Git (sul tuo terminale locale)
Anche se `bun.lock` è in `.gitignore`, se è già stato tracciato da Git in precedenza va rimosso con il comando apposito:
```bash
# 1. Rimuovi forzatamente bun.lock da Git (senza toccare gli altri file)
git rm -f bun.lock bun.lockb 2>/dev/null || true

# 2. Verifica che package-lock.json sia tracciato
git add package.json package-lock.json .node-version .nvmrc .npmrc .gitignore

# 3. Fai commit e push su GitHub
git commit -m "fix: rimuovi bun.lock e imposta Node.js/npm standard per Cloudflare"
git push
```

#### Passaggio 2: Svuota la Cache di Build su Cloudflare Pages (Fondamentale!)
Poiché il log indica `Restoring from dependencies cache`, Cloudflare riutilizzerebbe i vecchi file cached di Bun. Per azzerarla:
1. Vai su **Cloudflare Dashboard** → **Workers & Pages** → Seleziona il tuo progetto.
2. Clicca sulla scheda **Deployments**.
3. Accanto all'ultimo deployment fallito, clicca su **...** (oppure entra nel log) e seleziona **Retry deployment**.
4. Spunta la casella **"Clear build cache"** (Svuota cache di build) e conferma.
5. In alternativa, in **Settings** → **Environment variables**, assicurati che siano impostate:
   - `NODE_VERSION` = `20`
   - `PACKAGE_MANAGER` = `npm`
Cloudflare userà ora esclusivamente `npm ci` con Node.js 20 e la build completerà con successo in ~25 secondi!

---

## ⚙️ File di Configurazione Cloudflare già Inclusi nel Progetto

Il progetto contiene già tutti i file specifici richiesti da Cloudflare:

1. **`wrangler.toml`**: Specifica il nome del progetto, la compatibility date e la cartella di output `dist`.
2. **`public/_redirects`**: Regola `/*  /index.html  200` per consentire la navigazione client-side senza errori 404 nei refresh.
3. **`public/_headers`**: 
   - Cache immutabile di 1 anno per gli asset JS/CSS con hash (`/assets/*`).
   - Disabilitazione cache per `/sw.js` e `/registerSW.js` per aggiornare istantaneamente la PWA.
   - Header di sicurezza moderni (`X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`).
4. **`public/pwa-*.png` e `public/icon.svg`**: Icone standard per Android, iOS Safari e desktop.
