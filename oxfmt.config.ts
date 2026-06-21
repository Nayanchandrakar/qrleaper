import { defineConfig } from "oxfmt"

export default defineConfig({
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  printWidth: 80,
  sortTailwindcss: {
    functions: ["cn", "cva"]
  },
  sortImports: true,
  embeddedLanguageFormatting: "auto",
  ignorePatterns: ["dist/", "node_modules/", ".next/", "coverage/", "bun.lock"]
})
