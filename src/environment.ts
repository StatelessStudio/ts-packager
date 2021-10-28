import * as dotenv from 'dotenv';
const envfile = dotenv.config();

/**
 * Environment Variables Schema
 */
export class Environment {
	APP_TITLE = 'ts-package';
}

// Export
export const env: Environment = Object.assign(
	new Environment(),
	envfile.parsed
);
