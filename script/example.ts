// The following imports are generic across all scripts
import { bootstrap } from '../src/bootstrap';

// These imports are specific to the example script, but may be used
// 	for others
import { log } from '../src/log';
import { env } from '../src/environment';

/**
 * Do something!
 */
export async function example(): Promise<void> {
	log.info('Hello ' + env.buildDir);
}

bootstrap(example);
