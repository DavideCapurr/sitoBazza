# Hotel Ristorante Conca d'Oro — sito ufficiale

Sito ufficiale dell'**Hotel Ristorante Conca d'Oro** di Salò (Lago di Garda, BS),
gestione famiglia **Bazzani** (Chef Marco Bazzani, sala coordinata da Augusto Bazzani).
42 camere, quattro sale ristorante fino a 600 ospiti, parco con palme, due terrazze
sul Golfo di Salò e spiaggia privata.

Costruito con **Next.js 15** (App Router) + **TypeScript** + **Tailwind CSS v4**
+ **next-intl** (italiano, inglese, tedesco).

## Avvio

```bash
npm install
cp .env.example .env.local
# (eventualmente personalizza NEXT_PUBLIC_BOOKING_URL)
npm run dev
```

Apri http://localhost:3000 → verrai reindirizzato a `/it`.

Lingue supportate (path prefix sempre presente):
- `http://localhost:3000/it`
- `http://localhost:3000/en`
- `http://localhost:3000/de`

## Struttura

```
src/
  app/
    [locale]/
      layout.tsx           # html/body, font, metadata, JSON-LD, header/footer
      page.tsx             # Home
      hotel/page.tsx       # Hotel & Camere
      ristorante/page.tsx  # Ristorante
      storia/page.tsx      # Famiglia Bazzani
      galleria/page.tsx    # Galleria + lightbox
      contatti/page.tsx    # Contatti, mappa, form mailto
    layout.tsx             # root passthrough
    globals.css            # design tokens (Tailwind v4 @theme)
    sitemap.ts / robots.ts
  components/              # Header, Footer, Hero, RoomCard, Gallery, ...
  i18n/                    # routing, request (next-intl)
  middleware.ts            # locale detection / prefix
messages/
  it.json / en.json / de.json
public/
  images/                  # placeholder SVG (vedi public/images/README.md)
  favicon.svg
```

## Prenotazione

Tutti i CTA "Prenota" sono `<a target="_blank">` verso
`NEXT_PUBLIC_BOOKING_URL` (Booking.com).

In **futuro** sostituiremo il componente `BookNowButton` con un motore di
prenotazione interno (calendario disponibilità + checkout). Tutto il resto
del sito è già pronto: una sola modifica al componente, niente refactor.

Override per lingua opzionali via env:
- `NEXT_PUBLIC_BOOKING_URL_IT`
- `NEXT_PUBLIC_BOOKING_URL_EN`
- `NEXT_PUBLIC_BOOKING_URL_DE`

## Contenuti

I testi nei file `messages/{it,en,de}.json` sono basati sulle informazioni
pubbliche conosciute (Famiglia Bazzani, 39 camere, ristorante bresciano,
Via Zette 7 Salò, parco con palme). Sostituire con copy ufficiale prima del
go-live.

Le immagini in `public/images/**` sono **placeholder SVG**. Sostituirle
seguendo le indicazioni di `public/images/README.md`.

## SEO

- `<html lang>` per locale
- Open Graph + Twitter card per pagina
- `alternates.languages` con tag `hreflang` per IT / EN / DE / x-default
- `JSON-LD` schema.org `Hotel` (indirizzo, geo, n. camere, amenità)
- `sitemap.xml` e `robots.txt` generati da `app/sitemap.ts` e `app/robots.ts`

## Build & deploy

```bash
npm run build
npm run start
```

Deploy consigliato su **Vercel**: import repository → impostare
`NEXT_PUBLIC_BOOKING_URL` (e `NEXT_PUBLIC_SITE_URL` con il dominio finale)
→ collegare il dominio `hotelconcadoro.com`.

## Verifica end-to-end

1. `npm run dev` → home redirige a `/it`.
2. Visita ogni pagina nelle 3 lingue tramite il selettore in header.
3. Clicca **Prenota** in header / hero / sezioni → apre Booking.com in nuova tab.
4. Test responsive: 360 / 768 / 1280 / 1920 px.
5. `npm run build` deve completare senza warning.
6. Lighthouse mobile: target ≥ 90 su Performance / SEO / A11y / Best Practices.
7. Verifica `/sitemap.xml`, `/robots.txt` e JSON-LD con Google Rich Results.
