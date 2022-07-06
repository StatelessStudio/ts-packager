import { overrideJson, readJson, writeJson } from '../json';
import { JsonObject, JsonOverrides } from '../json/json-types';
import { defaultPackageJsonOverrides } from './default-package-json-overrides';

/**
 * Bundle the package.json file
 *
 * @param filename package.json file base name
 * @param outdir Output directory path
 */
export function bundlePackageJson(
	filename: string,
	outdir: string,
	overrides?: JsonOverrides,
): void {
	const pj: JsonObject = readJson(process.cwd(), filename);
	overrides = { ...defaultPackageJsonOverrides, ...overrides };
	const out = overrideJson(pj, overrides);

	writeJson(outdir, filename, out);
}
