# ts-packager

## Installation

1. Install `npm i --save-dev ts-packager`
2. In your package.json, set `"private": true`! This will prevent accidental publishes from the root.
3. Create a `ts-package-config.ts` file (see TS Package Config below for more information on this file)
4. Create a publish script (see Publish Script below)

## TS Package Config

Setup your ts-package project with a `ts-package-config.ts` file at the root of the project. **You will need to add this to tsconfig's includes!**

`ts-package-config.ts`
```typescript
import { Config, BundleMap, bundlePackageJson } from 'ts-packager';

export const config: Config = {
	buildDir: 'dist/src/' // Where to put the build files
};

export const files: BundleMap = {
	// Copy the changelog to the build
	'CHANGELOG.md': true,
	// Copy the license to the build
	// 'LICENSE.md': true,
	// Copy the readme to the build
	'README.md': true,
	// Copy the package.json to the build, removing scripts & dependencies
	'package.json': bundlePackageJson
};

```

`tsconfig.json`
```json
{
	"compilerOptions": {
		"baseUrl": "./",
		"outDir": "./dist",
		"sourceMap": true,
		"declaration": true,
		"module": "commonjs",
		"moduleResolution": "node",
		"target": "es6",
		"types": ["node"],
		"typeRoots": ["node_modules/@types"],
		"lib": ["es2017"]
	},
	"exclude": [
		"./dist/"
	],
	"include": [
		"./src/",
		"./test/",
		"./ts-package-config.ts" // Make sure to add this file!
	]
}
```

## Publish Script

`scripts/publish.sh`
```bash
#!/bin/bash
npm run test:prod &&
node_modules/.bin/ts-packager &&
cd dist/src/ &&
npm publish
```

## A note on paths

By default, ts-packager will assume your build is written to `dist/src/`, and that the ts-packager config file is compiled to `dist/ts-package-config.js`.

You can change this with the `--buildDir` and `--config` arguments, respectively.
