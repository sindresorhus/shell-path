/**
Get the environment path defined in your dotfiles.

@param shell - The shell to read environment path from. Default: User default shell.
@returns The environment path.

@example
```
import {shellPath} from 'shell-path';

console.log(await shellPath());
//=> '/usr/local/bin:/usr/bin:...'

console.log(await shellPath('/bin/bash'));
//=> '/usr/local/bin:/usr/bin:...'
```
*/
export function shellPath(shell?: string): Promise<string>;

/**
Get the environment path defined in your dotfiles.

@param shell - The shell to read environment path from. Default: User default shell.
@returns The environment path.

@example
```
import {shellPathSync} from 'shell-path';

console.log(shellPathSync());
//=> '/usr/local/bin:/usr/bin:...'

console.log(shellPathSync('/bin/bash'));
//=> '/usr/local/bin:/usr/bin:...'
```
*/
export function shellPathSync(shell?: string): string;
