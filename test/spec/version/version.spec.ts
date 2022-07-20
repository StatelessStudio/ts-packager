import { readFileSync } from 'fs';
import 'jasmine';
import { getVersion, writeVersionFile } from '../../../src/version';

describe('version', () => {
	it('can get the package.json version', () => {
		const version = getVersion();

		expect(version)
			.withContext('version')
			.toMatch(/^[0-9]+\.[0-9]+\.[0-9]+$/);
	});

	it('can write the package.json file', async () => {
		await writeVersionFile('test-version.js', 'dist');

		const file = readFileSync('dist/test-version.js').toString();

		expect(file)
			.withContext('file')
			.toMatch(
				/^module\.exports = \{ version: "[0-9]+\.[0-9]+\.[0-9]+" \};$/
			);

		expect(file)
			.withContext('file')
			.toContain(getVersion());
	});
});
