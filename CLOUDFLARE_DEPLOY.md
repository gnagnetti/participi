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
5. Clicca su **Save and Deploy**. In meno di 60 secondi il sito sarà online con dominio gratuito `.pages.dev` e certificato SSL/HTTPS automatico.

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

## ⚙️ File di Configurazione Cloudflare già Inclusi nel Progetto

Il progetto contiene già tutti i file specifici richiesti da Cloudflare:

1. **`wrangler.toml`**: Specifica il nome del progetto, la compatibility date e la cartella di output `dist`.
2. **`public/_redirects`**: Regola `/*  /index.html  200` per consentire la navigazione client-side senza errori 404 nei refresh.
3. **`public/_headers`**: 
   - Cache immutabile di 1 anno per gli asset JS/CSS con hash (`/assets/*`).
   - Disabilitazione cache per `/sw.js` e `/registerSW.js` per aggiornare istantaneamente la PWA.
   - Header di sicurezza moderni (`X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`).
4. **`public/pwa-*.png` e `public/icon.svg`**: Icone standard per Android, iOS Safari e desktop.
