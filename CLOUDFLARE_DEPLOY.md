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
5. In **Settings** → **Environment variables**, imposta:
   - `NODE_VERSION` = `22` (oppure `22.14.0`)
   - `PACKAGE_MANAGER` = `npm`
Cloudflare userà ora esclusivamente `npm ci` con Node.js 22 e la build completerà con successo!

---

## 🛠️ Risoluzione EBADENGINE & Rolldown "Cannot find native binding"

Se Cloudflare Pages mostrava:
```
npm warn EBADENGINE Unsupported engine {
  package: 'vite@8.3.0',
  required: { node: '^20.19.0 || >=22.12.0' },
  current: { node: 'v20.18.0', npm: '10.8.2' }
}
Cannot find native binding / failed to load rolldown native module
```

### Perché si verificava:
1. **Vite 8 & Rolldown richiedono Node >= 20.19.0 o >= 22.12.0**: Vite 8 è basato internamente su Rolldown. La versione Node 20.18.0 usata precedentemente non supporta i binari compilati di Rolldown.
2. **Optional Dependencies & Binari nativi**: I binari Linux di Rolldown (`@rolldown/binding-linux-x64-gnu`) sono distribuiti come `optionalDependencies`. Se l'ambiente CI omette i pacchetti opzionali, il modulo nativo non viene trovato.

### Come è stato risolto nel progetto:
1. **`.node-version`** impostato a `22.14.0` e **`.nvmrc`** impostato a `22`: Cloudflare Pages rileva automaticamente questi file e attiva subito **Node.js 22 (LTS)**.
2. **`.npmrc`** aggiornato con:
   - `include=dev` e `include=optional` (installa tutti i compilatori e i binari nativi di Rolldown per Linux).
   - `engine-strict=false` e `package-lock=true`.
3. **`package.json`**: Aggiunto campo `"engines": { "node": "^20.19.0 || >=22.12.0" }`.

---

## 🛠️ Risoluzione Errore `Failed: error occurred while running deploy command`

Se Cloudflare Pages mostrava:
```
Logs were written to "/opt/buildhome/.config/.wrangler/logs/wrangler-...log"
Failed: error occurred while running deploy command
```

### Perché si verifica:
1. **Conflitto in `wrangler.toml`**: Cloudflare Pages si aspettava solo `pages_build_output_dir = "dist"`. Se era presente un blocco `[build]` con `command` o un parametro `name` che non combacia con il nome del progetto nella dashboard di Cloudflare, Wrangler fallisce istantaneamente.
2. **Nome del progetto non corrispondente**: Se in `wrangler.toml` è indicato un `name` diverso dal nome dell'applicazione creata su Cloudflare Pages.

### Come visualizzare i log dettagliati di Wrangler in console:
In **Settings** → **Environment variables**:
- Aggiungi la variabile: **`WRANGLER_LOG`** con valore **`debug`**.
Con questa variabile attiva, tutti i log interni scritti in `/opt/buildhome/...` verranno stampati **in chiaro direttamente nella schermata di build** di Cloudflare!

---

## ⚙️ File di Configurazione Cloudflare già Inclusi nel Progetto

Il progetto contiene già tutti i file specifici richiesti da Cloudflare:

1. **`wrangler.toml`**: Configurazione corretta per Pages con `pages_build_output_dir = "dist"`.
2. **`public/_redirects`**: Regola `/*  /index.html  200` per consentire la navigazione client-side senza errori 404 nei refresh.
3. **`public/_headers`**: 
   - Cache immutabile di 1 anno per gli asset JS/CSS con hash (`/assets/*`).
   - Disabilitazione cache per `/sw.js` e `/registerSW.js` per aggiornare istantaneamente la PWA.
   - Header di sicurezza moderni (`X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`).
4. **`public/pwa-*.png` e `public/icon.svg`**: Icone standard per Android, iOS Safari e desktop.
