'use strict';
const childProcess = require('child_process');
const path = require('path');
const execa = require('execa');
const stripAnsi = require('strip-ansi');
const shell = process.env.SHELL || '/bin/sh';
const user = process.env.USER;
const opts = {encoding: 'utf8'};

function clean(str) {
	return stripAnsi(str.trim()).split('\n').pop();
}

function pathFromShell() {
	return execa(shell, ['-i', '-c', 'echo "$PATH"'])
		.then(x => clean(x.stdout) || '')
		.catch(() => '');
}

function pathFromSudo() {
	return execa('sudo', ['-Hiu', user, 'env'])
		.then(x => parseEnv(x.stdout) || '')
		.catch(() => '');
}

function pathFromShellSync() {
	return clean(childProcess.execFileSync(shell, ['-i', '-c', 'echo "$PATH"'], opts)) || '';
}

function pathFromSudoSync() {
	try {
		// TODO: use `execa` → https://github.com/sindresorhus/execa/issues/7
		const stdout = childProcess.execFileSync('sudo', ['-Hiu', user, 'env'], opts);
		return parseEnv(stdout) || '';
	} catch (err) {
		return '';
	}
}

function parseEnv(env) {
	const pathLine = stripAnsi(env.trim()).split('\n').filter(x => /^PATH=/.test(x.trim()))[0];

	if (!pathLine) {
		return '';
	}

	return pathLine.split('=')[1] || '';
}

function longest(arr) {
	return arr.reduce((a, b) => {
		return a.split(path.delimiter).length > b.split(path.delimiter).length ? a : b;
	});
}

module.exports = () => {
	if (process.platform === 'win32') {
		return Promise.resolve(process.env.PATH);
	}

	return Promise.all([pathFromShell(), pathFromSudo()]).then(result => {
		return longest(result.concat(process.env.PATH));
	});
};

module.exports.sync = () => {
	if (process.platform === 'win32') {
		return process.env.PATH;
	}

	return longest([
		pathFromShellSync(),
		pathFromSudoSync(),
		process.env.PATH
	]);
};
