/**
 * Bundle extension entry points into single files Chrome can load
 * (MV3 service worker + content scripts do not support multi-file ESM imports reliably).
 */
import * as esbuild from "esbuild";

const shared = {
  bundle: true,
  platform: "browser",
  target: "es2022",
  logLevel: "info",
  format: "iife",
};

const entries = [
  { in: "src/background.ts", out: "dist/background.js" },
  { in: "src/contentScript.ts", out: "dist/contentScript.js" },
  { in: "src/sf-bridge.ts", out: "dist/sf-bridge.js" },
  { in: "src/popup.ts", out: "dist/popup.js" },
  { in: "src/options.ts", out: "dist/options.js" },
];

for (const { in: entry, out: outfile } of entries) {
  await esbuild.build({
    ...shared,
    entryPoints: [entry],
    outfile,
  });
}

console.log("Extension bundle complete.");
