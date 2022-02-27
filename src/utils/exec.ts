import { exec as childProcExec } from 'child_process';
import { log } from '../log';

/**
 * Execute a command
 *
 * @param cmd Command to execute
 * @param silent (Optional) Set to true to output command output
 * @returns Returns the command output
 */
export async function exec(cmd: string, silent = false): Promise<unknown> {
	return new Promise((a, r) => {
		log.info('p> ' + cmd);

		childProcExec(cmd, (err, stdout, stderr) => {
			if (!silent) {
				if (stdout) {
					log.info(stdout);
				}

				if (stderr) {
					log.error(stderr);
				}
			}

			if (err) {
				r(err);
			}
			else {
				a(stdout);
			}
		});
	});
}
