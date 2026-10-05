import { mkdir, writeFile } from "node:fs/promises";
import sharp from "sharp";

// Deterministic, locally generated brand assets. No external image services.
await mkdir("public", { recursive: true });
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192"><defs><linearGradient id="g"><stop stop-color="#bba2ff"/><stop offset="1" stop-color="#8ce3e8"/></linearGradient></defs><rect width="192" height="192" rx="44" fill="#111116"/><path d="M56 147V53h21v9c8-8 17-12 28-12 26 0 44 20 44 47s-18 47-44 47c-10 0-19-4-27-11v14Zm23-50c0 15 10 26 23 26s23-11 23-26-10-26-23-26-23 11-23 26Z" fill="url(#g)"/><circle cx="153" cy="141" r="9" fill="#8ce3e8"/></svg>`;
await writeFile("public/favicon.svg", icon);
for (const [filename, size] of [["favicon-32.png", 32], ["apple-touch-icon.png", 180], ["icon-192.png", 192], ["icon-512.png", 512]]) {
  await sharp(Buffer.from(icon)).resize(size, size).png().toFile(`public/${filename}`);
}
// An ICO entry can embed a PNG; this retains a crisp 32px fallback.
const png = await sharp(Buffer.from(icon)).resize(32, 32).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header[6] = 32; header[7] = 32;
header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
await writeFile("public/favicon.ico", Buffer.concat([header, png]));
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="g"><stop stop-color="#bba2ff"/><stop offset="1" stop-color="#8ce3e8"/></linearGradient><radialGradient id="b"><stop stop-color="#27203d"/><stop offset="1" stop-color="#0a0a0e"/></radialGradient></defs><rect width="1200" height="630" fill="#0a0a0e"/><circle cx="990" cy="310" r="300" fill="url(#b)"/><g fill="none" stroke-width="1"><ellipse cx="984" cy="320" rx="176" ry="70" stroke="#bba2ff" transform="rotate(-34 984 320)"/><ellipse cx="984" cy="320" rx="176" ry="70" stroke="#8ce3e8" transform="rotate(34 984 320)"/><circle cx="984" cy="320" r="64" stroke="#807196"/></g><circle cx="823" cy="403" r="6" fill="#8ce3e8"/><g font-family="Arial, sans-serif"><text x="72" y="102" fill="#f1eff7" font-size="40" font-weight="700">prem<tspan fill="#bba2ff">.</tspan></text><text x="72" y="201" fill="#aaa4ba" font-size="13" letter-spacing="3">SOFTWARE ENGINEERING / MELBOURNE</text><text x="66" y="310" fill="#f1eff7" font-size="80" font-weight="700" letter-spacing="-4">Thoughtful code.</text><text x="66" y="407" fill="url(#g)" font-size="80" font-weight="700" letter-spacing="-4">Real-world impact.</text><text x="72" y="536" fill="#b9b3c8" font-size="16">Deakin University · Class of 2026 · Open to graduate &amp; internship roles</text></g><path d="M72 572h1056" stroke="#292831"/></svg>`;
await sharp(Buffer.from(social)).png().toFile("public/og.png");
await writeFile("public/site.webmanifest", JSON.stringify({ name: "Prem — Portfolio", short_name: "Prem", start_url: "./", display: "standalone", background_color: "#0a0a0e", theme_color: "#0a0a0e", icons: [{ src: "icon-192.png", sizes: "192x192", type: "image/png" }, { src: "icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }] }, null, 2) + "\n");
console.log("Generated favicon set, social card, and web manifest in public/.");
