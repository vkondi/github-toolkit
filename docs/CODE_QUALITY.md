# Code Quality Guide

This document outlines the code quality tools and practices used in the GitHub Toolkit project to maintain high standards of code consistency, type safety, and formatting.

## Overview

The project implements a comprehensive code quality setup with three main pillars:

1. **Linting** - Static code analysis with ESLint
2. **Code Formatting** - Automatic code formatting with Prettier
3. **Type Safety** - TypeScript type checking
4. **Pre-commit Hooks** - Automated checks before commits with Husky

---

## 1. ESLint

ESLint is used to identify and report patterns found in ECMAScript/JavaScript and TypeScript code. It helps catch bugs and enforces code style consistency.

### Configuration

- **Config File**: `.eslintrc.json`
- **Ignore File**: `.eslintignore`

### Setup Details

**Recommended Rules Extended**:

- `@typescript-eslint/recommended` - TypeScript best practices
- `plugin:react/recommended` - React best practices
- `plugin:react-hooks/recommended` - React Hooks rules
- `next/core-web-vitals` - Next.js core web vitals
- `prettier` - Integration with Prettier to avoid conflicts

### Key Rules

- **Unused Variables**: Variables starting with `_` are ignored (e.g., `_unused`)
- **Any Type**: Using `any` is warned (not errored) to allow gradual migration
- **React in JSX**: Not required to import React in Next.js
- **Prettier Integration**: Formatting issues are reported as ESLint errors for unified workflow

### Commands

```bash
# Lint all TypeScript and JavaScript files
yarn lint

# Lint and automatically fix issues
yarn lint:fix
```

---

## 2. Prettier

Prettier is an opinionated code formatter that enforces a consistent code style across the entire codebase.

### Configuration

- **Config File**: `.prettierrc`
- **Ignore File**: `.prettierignore`

### Formatting Rules

```json
{
  "semi": true, // Add semicolons
  "trailingComma": "es5", // Trailing commas in ES5 syntax
  "singleQuote": true, // Use single quotes
  "printWidth": 100, // Line length limit
  "tabWidth": 2, // Indentation size
  "useTabs": false, // Use spaces instead of tabs
  "arrowParens": "always" // Always include arrow function parentheses
}
```

### Commands

```bash
# Format all files
yarn format

# Check formatting without making changes
yarn format:check
```

---

## 3. TypeScript Type Checking

TypeScript provides static type checking to catch errors during development and improve code reliability.

### Configuration

- **Config File**: `tsconfig.json`

### Commands

```bash
# Check for type errors without emitting output
yarn type-check
```

---

## 4. Husky & Lint-Staged

Husky enables running scripts on Git hooks, while lint-staged runs linters only on staged files to improve performance.

### Configuration

- **Hook File**: `.husky/pre-commit`
- **Lint-Staged Config**: Defined in `package.json`

### Pre-commit Hook

The pre-commit hook automatically runs:

1. **Lint-Staged**: Lints and formats all staged files
   - TypeScript/JavaScript files: ESLint + Prettier
   - JSON/Markdown/YAML files: Prettier only

2. **Type Check**: Verifies no TypeScript errors exist

If any check fails, the commit is prevented. Fix the issues and try again.

### Staged Files Configuration

```json
"lint-staged": {
  "*.{ts,tsx,js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,yaml,yml}": ["prettier --write"]
}
```

---

## Workflow

### Before Making a Commit

1. **Stage your changes**:

   ```bash
   git add .
   ```

2. **The pre-commit hook will automatically**:
   - Run ESLint and fix auto-fixable issues
   - Format code with Prettier
   - Check TypeScript for errors

3. **If errors occur**:
   - Manual errors that can't be auto-fixed must be corrected
   - Re-stage the corrected files
   - Try committing again

### During Development

- **Enable ESLint in your IDE**: Most IDEs (VS Code, etc.) recognize `.eslintrc.json` automatically
- **Enable Prettier formatting**: Use the Prettier extension in your IDE
- **Run checks manually**: Use `yarn lint:fix` and `yarn format` to pre-fix issues before committing

---

## Editor Integration

### VS Code Configuration

For the best development experience with VS Code, consider installing:

- [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier Extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Add this to your `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "eslint.validate": ["typescript", "typescriptreact"],
  "eslint.run": "onSave"
}
```

---

## Troubleshooting

### ESLint Issues

**Problem**: ESLint errors that can't be auto-fixed

- **Solution**: Review the error messages and fix them manually
- Check the [ESLint documentation](https://eslint.org/docs/rules/)

### Prettier Conflicts

**Problem**: ESLint and Prettier formatting conflicts

- **Solution**: This should not happen due to `eslint-config-prettier` integration
- Run `yarn lint:fix` followed by `yarn format`

### Pre-commit Hook Failures

**Problem**: Commits blocked by pre-commit hook

- **Solution**:
  1. Fix the reported errors
  2. Stage the corrected files
  3. Commit again

### Type Checking Failures

**Problem**: TypeScript errors preventing commits

- **Solution**:
  1. Run `yarn type-check` to see all errors
  2. Fix type errors according to TypeScript diagnostics
  3. Stage corrected files and retry

---

## Best Practices

1. **Keep ESLint Configuration Updated**: Review and update rules as the project evolves
2. **Use IDE Extensions**: Install ESLint and Prettier extensions for real-time feedback
3. **Run Checks Locally**: Use `yarn lint:fix`, `yarn format:check`, and `yarn type-check` before pushing
4. **Don't Disable Rules Globally**: Use inline comments only when necessary (`// eslint-disable-line`)
5. **Review Rule Violations**: Understand why a rule exists before ignoring it

---

## Related Documentation

- [ESLint Rules](https://eslint.org/docs/rules/)
- [@typescript-eslint Rules](https://typescript-eslint.io/rules/)
- [React ESLint Plugin](https://github.com/jsx-eslint/eslint-plugin-react)
- [Prettier Options](https://prettier.io/docs/en/options.html)
- [Husky Git Hooks](https://typicode.github.io/husky/)
