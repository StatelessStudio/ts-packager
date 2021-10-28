import { Config } from './config';
import { BundleMap } from './bundle/bundle';
import { bundlePackageJson } from './bundle/bundle-package-json';

export const config: Config = {
	tsconfig: 'tsconfig.json',
	buildDir: 'dist/src/'
};

export const files: BundleMap = {
	'CHANGELOG.md': true,
	'LICENSE.md': true,
	'README.md': true,
	'bin/dist-index.js': 'bin/index.js',
	'package.json': bundlePackageJson
};
