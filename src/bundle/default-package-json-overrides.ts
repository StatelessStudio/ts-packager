import { replaceAllDoubleDots } from '../utils/replace-double-dots';
import { JsonOverrides } from '../json/json-types';

/**
 * Default overrides for bundling package.json
 */
export const defaultPackageJsonOverrides: JsonOverrides = {
	private: undefined,
	main: 'index.js',
	types: 'index.d.ts',
	scripts: {},
	dependencies: (key, original) => {
		return replaceAllDoubleDots(original[key], 'dist/src');
	},
	devDependencies: undefined,
};
