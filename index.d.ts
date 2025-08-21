export type Options = {
	/**
	The shell to read environment path from.

	Default: User's default shell.
	*/
	readonly shell?: string;
};

/**
Get the environment path defined in your dotfiles.

@returns The environment path.

@example
```
import {shellPath} from 'shell-path';

console.log(await shellPath());
//=> '/usr/local/bin:/usr/bin:...'

console.log(await shellPath({shell: '/bin/bash'}));
//=> '/usr/local/bin:/usr/bin:...'
```
*/
export function shellPath(options?: Options): Promise<string>;

/**
Get the environment path defined in your dotfiles.

@returns The environment path.

@example
```
import {shellPathSync} from 'shell-path';

console.log(shellPathSync());
//=> '/usr/local/bin:/usr/bin:...'

console.log(shellPathSync({options: '/bin/bash'}));
//=> '/usr/local/bin:/usr/bin:...'
```
*/
export function shellPathSync(options?: Options): string;
