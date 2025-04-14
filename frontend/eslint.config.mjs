import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // React rules
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      
      // Next.js rules
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "warn",
      
      // TypeScript rules
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_|^filter$|^linkId$|^props$|^view$", 
        "varsIgnorePattern": "^_|^Link$|^BarChart3$|^Link2$|^Plus$|^Search$|^Settings$|^Tag$|^Button$|^Card$|^CardContent$|^CardDescription$|^CardHeader$|^CardTitle$|^Input$|^Tabs$|^TabsContent$|^TabsList$|^TabsTrigger$|^LinkTable$|^LinkStats$|^ThemeToggle$|^Logo$" 
      }],
      
      // General
      "no-console": ["warn", { "allow": ["warn", "error"] }]
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
); 