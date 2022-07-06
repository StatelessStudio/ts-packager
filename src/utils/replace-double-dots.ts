import { JsonObject, JsonValue } from '../json/json-types';
import { join as joinPath, relative as relativePath } from 'path';

/**
 * Replace double dots for a changed relative path
 *
 * @param outdir Relative output directoy
 * @param source Package source
 * @returns Returns the modified path string
 */
export function replaceDoubleDot(outdir: string, source: string): string {
	const path1 = joinPath(process.cwd(), outdir);
	const path2 = joinPath(source);

	return relativePath(path1, path2);
}

/**
 * Replace all relative path double-dots
 *
 * @param dependencies Dependency map
 * @param outdir Relative output directory
 * @returns Returns modified dependency map
 */
export function replaceAllDoubleDots(
	dependencies: JsonObject,
	outdir: string
): JsonObject {
	for (const dependency in dependencies) {
		let source: JsonValue = dependencies[dependency];

		if (
			typeof source === 'string' &&
			(source.includes('../') || source.includes('..\\'))
		) {
			source = source.replace('file:', '');
			source = replaceDoubleDot(outdir, source);
			source = `file:${source}`;

			dependencies[dependency] = source;
		}
	}

	return dependencies;
}
