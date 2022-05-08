import { replaceAllDoubleDots } from '../../../src/bundle/bundle-package-json';

describe('bundle/bundle-package-json', () => {
	it('replaces relative paths', () => {
		const paths = replaceAllDoubleDots(
			{ 'test': 'file:../test-package/dist' },
			'dist/src/'
		);

		paths.test = paths.test.replace(/\\/g, '/');

		expect(paths.test).toEqual('file:../../../test-package/dist');
	});
});
