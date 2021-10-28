import { getBuildDirectory } from './utils/get-build-directory';
import { getCliArgs } from './cli';
import { ConfigFile, loadConfig } from './config-loader';
import { Config } from './config';
import { overwriteEnvironment } from './utils/overwrite-environment';

/**
 * Environment Variables Schema
 */
export class Environment implements Config {
	config = 'dist/src/ts-package.js';
	tsconfig = 'tsconfig.json';
	buildDir = '';

	public init(): void {
		if (!this.buildDir) {
			this.buildDir = getBuildDirectory(this.tsconfig);
		}
	}
}

// Defaults
const defaultConfig: Environment = new Environment();

// Load CLI arguments
const cliArgs: Config = getCliArgs(defaultConfig);

// Load config file
export const configFile: ConfigFile = loadConfig(cliArgs, defaultConfig);

overwriteEnvironment(defaultConfig, configFile.config);
overwriteEnvironment(defaultConfig, cliArgs);

defaultConfig.init();

// Export
export const env: Environment = defaultConfig;
