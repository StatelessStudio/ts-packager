import * as path from 'path';
import { existsSync } from 'fs';
import { copySync } from 'fs-extra';
import { log } from '../log';
import { env } from '../environment';

export type BundleFunction = (filename, outdir) => void;
export type BundleMap = Record<string, boolean|string|BundleFunction>;

/**
 * Bundle the project files
 *
 * @param files Bundle map
 * @param outdir (Optional) Output directory path (relative). Defaults to
 * 	the environment buildDir
 */
export async function bundle(files: BundleMap, outdir?: string): Promise<void> {
	log.info('p Bundling...');

	if (!outdir) {
		outdir = env.buildDir;
	}

	for (const filename in files) {
		const value: boolean|string|BundleFunction = files[filename];
		let outputFile = null;

		if (typeof value === 'string') {
			outputFile = path.join(outdir, value);
		}
		else if (value === true) {
			outputFile = path.join(outdir, filename);
		}
		else if (value instanceof Function) {
			log.info('Running callback for "' + filename + '"');
			value(filename, outdir);
		}

		if (outputFile) {
			if (!existsSync(filename)) {
				throw new Error('File "' + filename + '" not found!');
			}

			log.info('Copy "' + filename + '" to "' + outputFile + '"');
			copySync(filename, outputFile);
		}
	}
}
