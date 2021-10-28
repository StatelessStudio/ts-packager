/**
 * Convert string/buffer to string
 *
 * @param str Input string/buffer
 * @returns Returns the string
 */
export function toString(str: Buffer|string): string {
	if (str instanceof Buffer) {
		return str.toString();
	}

	return str;
}
