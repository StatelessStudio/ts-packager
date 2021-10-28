import { env } from '../src/environment';

describe('Environment', () => {
	it('can load', () => {
		expect(env).toBeDefined();
	});

	it('has config key', () => {
		expect(typeof env.config).toBe(typeof 'string');
	});
});
