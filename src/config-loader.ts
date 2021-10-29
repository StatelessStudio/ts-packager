import { Config } from './config';
import { join as joinPath } from 'path';
import { BundleMap } from './bundle';
import { Environment } from './environment';

export interface ConfigFile {
	config: Config,
	files: BundleMap
}

export function loadConfig(cliArgs: Config, defaults: Environment): ConfigFile {
	// Check for ts-package-config.ts config file
	let configPath: string = cliArgs.config;
	const configDir: string = process.cwd();

	if (!configPath.includes(configDir)) {
		configPath = joinPath(configDir, cliArgs.config);
	}

	// Load ts-package-config.ts
	let file: ConfigFile;

	try {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		file = require(configPath);
	}
	catch (e) {
		throw new Error(`Could not load config file "${configPath}"`);
	}

	const checkFileExport = (key: string) => {
		if (!(key in file)) {
			throw new Error(`Config file does not export "${key}"`);
		}

		if (typeof file[key] !== 'object') {
			throw new Error('Config file exported "${key}" is not an object');
		}
	};

	checkFileExport('config');
	checkFileExport('files');

	const fileConfig: Config = file.config;

	for (const key in fileConfig) {
		if (!(key in defaults)) {
			throw new Error('Unknown configuration item ' + key);
		}
	}

	return file;
}
