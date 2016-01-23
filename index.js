'use strict';
const os = require('os');
const childProcess = require('child_process');
const path = require('path');
const execa = require('execa');
const stripAnsi = require('strip-ansi');
const shell = process.env.SHELL || '/bin/sh';
const user = process.env.USER;
const opts = {encoding: 'utf8'};

function clean(str, isEnv) {
	str = stripAnsi(str.trim());

	if (isEnv) {
		return str;
	}

	if (str.indexOf(os.EOL) === -1) {
		return str;
	}

	str = str.split(os.EOL);
	return str[str.length - 1];
}

function pathFromShell() {
	return execa(shell, ['-i', '-c', 'echo "$PATH"'], opts)
		.then(x => clean(x.stdout))
		.catch(() => '');
}

function pathFromShellSync() {
	return clean(childProcess.execFileSync(shell, ['-i', '-c', 'echo "$PATH"'], opts)) || '';
}

function pathFromSudo() {
	return execa('sudo', ['-Hiu', user, 'env'], opts)
		.then(x => parseEnv(clean(x.stdout, true)) || '')
		.catch(() => '');
}

function pathFromSudoSync() {
	try {
		const stdout = childProcess.execFileSync('sudo', ['-Hiu', user, 'env'], opts);
		return parseEnv(clean(stdout, true)) || '';
	} catch (err) {
		// may fail with 'sudo: must be setuid root'
		return '';
	}
}

function parseEnv(env) {
	const pathLine = env.trim().split(os.EOL).filter(x => /^PATH=/.test(x.trim()))[0];

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

	// return the longest found path
	return longest([
		pathFromShellSync(),
		pathFromSudoSync(),
		process.env.PATH
	]);
};
