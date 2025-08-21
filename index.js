import {shellEnv, shellEnvSync} from 'shell-env';

export async function shellPath(options) {
	const {PATH} = await shellEnv(options?.shell);
	return PATH;
}

export function shellPathSync(options) {
	const {PATH} = shellEnvSync(options?.shell);
	return PATH;
}
