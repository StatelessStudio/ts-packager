import { Config } from '../config';
import { Environment } from '../environment';

/**
 * Overwrite the Environment from the Config
 * @param a Environment
 * @param b Config
 */
export function overwriteEnvironment(
	a: Partial<Environment>,
	b: Partial<Config>
): void {
	for (const key in b) {
		const value = b[key];

		if (
			value !== undefined &&
			value !== null &&
			value !== '' &&
			typeof value !== 'function'
		) {
			a[key] = value;
		}
	}
}
