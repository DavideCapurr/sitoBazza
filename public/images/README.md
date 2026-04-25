# Immagini del sito

Questa cartella contiene immagini statiche servite da `public/images/*`.

Struttura:

- `hero/` — immagini full-bleed per i Hero delle pagine (consigliato 2560×1440, JPG ottimizzato ~200–400 KB).
  - `home.jpg` — vista del lago + hotel
  - `hotel.jpg` — esterno hotel o corridoio raffinato
  - `restaurant.jpg` — dettaglio piatto o sala
  - `story.jpg` — foto famiglia Bazzani o foto d'epoca
  - `gallery.jpg` — collage terrazza/palme
  - `contact.jpg` — vista panoramica Salò
- `rooms/` — immagini camere (1600×1067, JPG ~150 KB).
  - `classic.jpg`, `superior.jpg`, `lake-view.jpg`
- `restaurant/` — piatti, terrazza, sala.
- `gallery/` — 12–24 immagini varie (hotel, camere, ristorante, parco).
- `og/` — `og-default.jpg` (1200×630) per Open Graph/Twitter.

## Stato attuale

In v0 sono presenti **placeholder in SVG/JPG generici** (pattern caldi color crema/oro/verde salvia) che richiamano la palette del brand. Sostituirli con foto reali prima del go-live.

## Sostituzione

1. Nomina i file esattamente come indicato sopra.
2. Ottimizza le immagini prima di caricare (es. [Squoosh](https://squoosh.app) in MozJPEG q=80 o WebP q=80).
3. Usa crop 16:9 per gli hero, 4:3 per le camere, 3:2 per la gallery.
4. `next/image` si occupa di generare automaticamente le varianti responsive.

## Crediti placeholder

I placeholder inclusi sono **svg generati** in palette brand — non richiedono attribution.
Se al loro posto si inseriscono foto da Unsplash/Pexels, aggiungere qui i crediti.
