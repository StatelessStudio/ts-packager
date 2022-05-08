import * as cli from 'command-line-args';
import { Config } from './config';
import { Environment } from './environment';

/**
 * Get CLI arguments
 *
 * @param defaults Environment defaults
 * @returns Returns a new Environment object of the cli args
 */
export function getCliArgs(defaults: Environment): Config {
	const args = cli([
		{
			name: 'config',
			defaultValue: defaults.config
		},
		{
			name: 'buildDir',
			defaultValue: defaults.buildDir
		}
	]);

	if (args?.config?.includes('jasmine.json')) {
		args.config = defaults.config;
	}

	return args;
}
