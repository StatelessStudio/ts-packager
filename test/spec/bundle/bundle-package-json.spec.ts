import { replaceAllDoubleDots } from '../../../src/utils/replace-double-dots';

describe('bundle/bundle-package-json', () => {
	it('replaces relative paths', () => {
		const paths = replaceAllDoubleDots(
			{ 'test': 'file:../test-package/dist' },
			'dist/src/'
		);

		expect(typeof paths).toEqual('object');
		expect(typeof paths.test).toEqual('string');

		if (typeof paths?.test === 'string') {
			paths.test = paths.test.replace(/\\/g, '/');

			expect(paths.test).toEqual('file:../../../test-package/dist');
		}
		else {
			throw new Error('Expected paths.test to be string');
		}
	});
});
