import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "docs/screenshots";

const PAGES = [
  { slug: "/it", name: "01-home-it" },
  { slug: "/it/hotel", name: "02-hotel-it" },
  { slug: "/it/ristorante", name: "03-ristorante-it" },
  { slug: "/it/storia", name: "04-storia-it" },
  { slug: "/it/galleria", name: "05-galleria-it" },
  { slug: "/it/contatti", name: "06-contatti-it" },
  { slug: "/en", name: "07-home-en" },
  { slug: "/de", name: "08-home-de" },
];

const VIEWS = [
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
try {
  for (const view of VIEWS) {
    const context = await browser.newContext({
      viewport: { width: view.width, height: view.height },
      deviceScaleFactor: view.deviceScaleFactor,
      isMobile: !!view.isMobile,
      hasTouch: !!view.hasTouch,
    });
    const page = await context.newPage();

    for (const p of PAGES) {
      const url = BASE + p.slug;
      console.log(`[${view.name}] ${url}`);
      await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
      // give fonts / hero image a moment
      await page.waitForTimeout(800);
      const file = join(OUT, `${p.name}-${view.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
    }
    await context.close();
  }
} finally {
  await browser.close();
}
console.log("done");
