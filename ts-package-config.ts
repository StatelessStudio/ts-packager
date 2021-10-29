import { Config } from './src/config';
import { BundleMap } from './src/bundle/bundle';
import { bundlePackageJson } from './src/bundle/bundle-package-json';

export const config: Config = {
	buildDir: 'dist/src/'
};

export const files: BundleMap = {
	'CHANGELOG.md': true,
	'LICENSE.md': true,
	'README.md': true,
	'bin/dist-index.js': 'bin/index.js',
	'package.json': bundlePackageJson
};
