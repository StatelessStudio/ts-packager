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
	return cli([
		{
			name: 'config',
			defaultValue: defaults.config
		},
		{
			name: 'tsconfig',
			defaultValue: defaults.tsconfig
		},
		{
			name: 'buildDir',
			defaultValue: defaults.buildDir
		}
	]);
}
