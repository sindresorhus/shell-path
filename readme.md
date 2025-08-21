# shell-path

> Get the [`$PATH`](https://en.wikipedia.org/wiki/PATH_(variable)) from the shell

Useful for Electron apps as GUI apps on macOS do not inherit the `$PATH` defined in your dotfiles *(.bashrc/.bash_profile/.zshrc/etc)*.

## Install

```sh
npm install shell-path
```

## Usage

When executed from a GUI app on macOS:

```js
import {shellPath} from 'shell-path';

console.log(process.env.PATH);
//=> '/usr/bin'

console.log(await shellPath());
//=> '/usr/local/bin:/usr/bin:...'

console.log(await shellPath({shell: '/bin/bash'}));
//=> '/usr/local/bin:/usr/bin:...'
```

## API

### shellPath(options?)

Returns a promise for the `$PATH`.

### shellPathSync(options?)

Returns the `$PATH`.

#### options

Type: `object`

##### shell

Type: `string`\
Default: [User's default shell](https://github.com/sindresorhus/default-shell)

The shell to read environment path from.

## Related

- [fix-path](https://github.com/sindresorhus/fix-path) - Fix the `$PATH` on macOS when run from a GUI app
- [shell-env](https://github.com/sindresorhus/shell-env) - Get environment variables from the shell
- [shell-history](https://github.com/sindresorhus/shell-history) - Get the command history of the user's shell
