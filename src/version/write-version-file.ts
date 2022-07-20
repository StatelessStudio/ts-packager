import { writeFile } from 'fs/promises';
import { join as joinPath } from 'path';

import { getVersion } from './get-version';

/**
 * Write the package.json version to OUTDIR/version.js
 *
 * @param filename Input filename
 * @param outdir Output directory
 */
export async function writeVersionFile(
	filename: string,
	outdir: string
): Promise<void> {
	filename = filename.replace('.ts', '.js');

	await writeFile(
		joinPath(outdir, filename),
		`module.exports = { version: "${getVersion()}" };`
	);
}
