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

## Getting compile-time version at runtime

You can setup ts-packager to compile the package.json version to the build, so that it is available at runtime:

1. Create a version typescript source file (for development)

`src/version.ts`
```typescript
// IMPORTANT: This file will be overridden at compile time
//	to export the current package.json's version as a string,
//	since this package.json won't be loaded dynamically by the
//	consumer. This code is in place for development
import { getVersion() } from 'ts-packager/version';

export const version = getVersion();
```

2. Import the version file to use it

`src/my-app.ts`
```typescript
import { version } from './version';

console.log('Version: ', version);
```

will log `Version: 1.2.3`

3. Add an entry to ts-packager's config to compile the package.json to the build:

`ts-package-config.ts`
```typescript
import { writeVersionFile } from 'ts-packager/version';

...

export const files: BundleMap = {
	...
	'src/version.ts': writeVersionFile,
};
```
