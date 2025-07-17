import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

const reactRecommendedConfig = pluginReact.configs.flat.recommended;

reactRecommendedConfig.settings = {
  react: {
    version: "detect",
  },
};

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: globals.browser },
  },
  reactRecommendedConfig,

]);