import { logger } from './logger';
import { toString } from './utils/to-string';

// Source mapping
if (!process[Symbol.for('ts-node.register.instance')]) {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	require('source-map-support').install({
		environment: 'node'
	});
}

// Stack traces
Error.stackTraceLimit = Infinity;
const nativePrepareStackTrace = Error.prepareStackTrace;
Error.prepareStackTrace = (err, traces) => {
	return nativePrepareStackTrace(err, traces)
		.split('\n')
		.filter(line => {
			return (
				line &&
				!line.includes('node_modules') &&
				!line.includes('internal/process/')
			);
		})
		.join('\n');
};

/**
 * Bootstrap a script
 *
 * @param returned The script returned promise
 */
export function bootstrap(promise: Promise<void|Buffer|string>): void {
	promise
		.then(returned => {
			if (typeof returned !== 'undefined') {
				logger.info(toString(returned));
			}
		})
		.catch(error => {
			logger.error('ERROR: ', toString(error));
			process.exit(error?.code ? error.code : 1);
		});
}
