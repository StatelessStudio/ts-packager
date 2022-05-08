import { join as joinPath, relative as relativePath } from 'path';
import { writeFileSync } from 'fs';

/**
 * Read the package file
 *
 * @param filename package.json base name
 * @returns Returns the contents as an object
 */
export function readPackageJson(filename: string): Record<string, unknown> {
	return require(joinPath(process.cwd(), filename));
}

/**
 * Write the package file
 *
 * @param filename package.json base name
 * @param outdir Output directory path
 * @param data Contents as an object
 */
export function writePackageJson(
	filename: string,
	outdir: string,
	data: Record<string, unknown>
): void {
	writeFileSync(
		joinPath(outdir, filename),
		JSON.stringify(data, null, '\t')
	);
}

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
export function replaceAllDoubleDots<T extends Record<string, any>>(
	dependencies: T,
	outdir: string
): T {
	for (const dependency in dependencies) {
		let source: any | string = dependencies[dependency];

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

/**
 * Bundle the package.json file
 *
 * @param filename package.json file base name
 * @param outdir Output directory path
 */
export function bundlePackageJson(
	filename: string,
	outdir: string,
): void {
	const pj = readPackageJson(filename);

	delete pj.private;
	pj.scripts = {};
	pj.devDependencies = {};
	pj.main = 'index.js';
	pj.types = 'index.d.ts';

	if ('dependencies' in pj && typeof pj.dependencies === 'object') {
		pj.dependencies = replaceAllDoubleDots(
			pj.dependencies,
			outdir
		);
	}

	writePackageJson(filename, outdir, pj);
}
