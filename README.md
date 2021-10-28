# ts-package

## Installation

1. Install `npm i --save-dev ts-package`
2. In your package.json, set `"private": true`! This will prevent accidental publishes from the root.
3. Create a `ts-package-config.ts` file (see TS Package Config for more information on this file)
4. Create a publish script (see Publish Script below)

## TS Package Config

Setup your ts-package project with a `ts-package-config.ts` file at the root of the project. **You will need to add this to tsconfig's includes!**

```typescript
import { Config, BundleMap, bundlePackageJson } from 'ts-package';

export const config: Config = {
	tsconfig: 'tsconfig.json',
	buildDir: 'dist/src/'
};

export const files: BundleMap = {
	'CHANGELOG.md': true,
	'LICENSE.md': true,
	'README.md': true,
	'package.json': bundlePackageJson
};
```

## Publish Script

```bash
#!/bin/bash
npm test
npm run build:prod
ts-package
cd dist/src/
npm publish
```

## A note on paths

By default, ts-package will assume your build is written to `dist/src/`, and that the ts-package config file is compiled to `dist/ts-package.js`.

You can change this with the `--buildDir` and `--config` arguments, respectively
