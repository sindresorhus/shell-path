# shell-path [![Build Status](https://travis-ci.org/sindresorhus/shell-path.svg?branch=master)](https://travis-ci.org/sindresorhus/shell-path)

> Get the `$PATH` from the shell

Useful for Electron/NW.js apps as GUI apps on OS X doesn't inherit the `$PATH` defined in your dotfiles *(.bashrc/.bash_profile/.zshrc/etc)*.


## Install

```
$ npm install --save shell-path
```


## Usage

When executed from a GUI app on OS X:

```js
var shellPath = require('shell-path');

console.log(process.env.PATH);
//=> '/usr/bin'

console.log(shellPath.sync());
//=> '/usr/local/bin:/usr/bin:...'
```


## API

### shellPath(callback(error, path))

### shellPath.sync()

Synchronous version. Returns the `$PATH`.


## Related

- [fix-path](https://github.com/sindresorhus/fix-path) - Fix the $PATH on OS X when run from a GUI app


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
