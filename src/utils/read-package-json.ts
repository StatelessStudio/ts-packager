import { readJson, JsonObject } from '../json';

let json;

/**
 * Read the contents of the package.json in CWD at compile time
 *
 * @returns Package.json contents as an object
 */
export function readPackageJson(): JsonObject {
	return json ?? (json = readJson(process.cwd(), 'package.json'));
}
