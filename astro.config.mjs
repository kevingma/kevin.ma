import { defineConfig } from "astro/config";

// Static files in dist/, served by nginx (see Dockerfile). `format: "file"`
// writes shelf.html, not shelf/index.html, so /shelf is served without the
// directory redirect nginx would otherwise send.
export default defineConfig({
  site: "https://kevin.ma",
  trailingSlash: "never",
  build: { format: "file" },
  devToolbar: { enabled: false },
});
