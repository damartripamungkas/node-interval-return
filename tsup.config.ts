import { defineConfig } from "tsup"

export default defineConfig({
  outDir: `./dist/src`,
  entry: [`./src/index.ts`],
  format: [`cjs`, `esm`],
  target: `es2022`,
  cjsInterop: false,
  dts: true,
  clean: true,
  minify: true
})
