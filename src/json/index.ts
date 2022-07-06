import { readFileSync, writeFileSync } from 'fs';
import { join as joinPath } from 'path';
import { JsonObject, JsonOverrides } from './json-types';

/**
 * Read a JSON file
 *
 * @param dir Input directory
 * @param filename Input filename
 * @returns Returns the contents as an object
 */
export function readJson(dir: string, filename: string): JsonObject {
	const absolute = joinPath(dir, filename);
	const file = readFileSync(absolute).toString();

	return JSON.parse(file);
}

/**
 * Write a JSON file
 *
 * @param dir Output directory
 * @param filename Output filename
 * @param data Contents as an object
 */
export function writeJson(
	dir: string,
	filename: string,
	data: JsonObject,
): void {
	const absolute = joinPath(dir, filename);

	writeFileSync(
		absolute,
		JSON.stringify(data, null, '\t')
	);
}

/**
 * Override JSON values
 *
 * @param data Original object
 * @param overrides Overrides
 * @returns Returns overrided values
 */
export function overrideJson(
	data: JsonObject,
	overrides: JsonOverrides
): JsonObject {
	const out = { ...data, ...overrides };

	for (const key in out) {
		const value = out[key];
		if (typeof value === 'function') {
			out[key] = value(key, data);
		}
		else if (value === undefined) {
			delete out[key];
		}
	}

	return out as JsonObject;
}
