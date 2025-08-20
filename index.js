import {shellEnv, shellEnvSync} from 'shell-env';

export async function shellPath(shell) {
	const {PATH} = await shellEnv(shell);
	return PATH;
}

export function shellPathSync(shell) {
	const {PATH} = shellEnvSync(shell);
	return PATH;
}
