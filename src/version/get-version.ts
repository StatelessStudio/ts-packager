import { readPackageJson } from '../utils/read-package-json';

/**
 * Get the package.json version
 *
 * @returns Returns the package.json version
 */
export function getVersion(): string {
	return (readPackageJson().version || '') + '';
}
