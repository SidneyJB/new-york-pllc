import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-unescaped-entities": "off",
			'@react/no-unescaped-entities': 'off',
			'@react/no-unknown-property': 'off',
			'@react/no-unused-prop-types': 'off',
			'@react/no-unused-vars': 'off',
			'@react/no-unused-imports': 'off',
			'@react/no-unused-expressions': 'off',
			'@react/no-unused-labels': 'off',
			'@react/no-unused-functions': 'off',
		},
  },
];

export default eslintConfig;
