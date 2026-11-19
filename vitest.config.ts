import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// oxlint-disable-next-line import/no-default-export -- vitest loads its config from the default export
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
