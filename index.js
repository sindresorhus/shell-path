'use strict';
const childProcess = require('child_process');
const execa = require('execa');
const stripAnsi = require('strip-ansi');
const shellEnv = require('shell-env');
const user = process.env.USER;
const opts = {encoding: 'utf8'};

function parseEnv(env) {
	const pathLine = stripAnsi(env.trim()).split('\n').filter(x => /^PATH=/.test(x.trim()))[0];
	return (pathLine && pathLine.split('=')[1]) || '';
}

function pathFromSudo() {
	return execa('sudo', ['-Hiu', user, 'env'])
		.then(x => parseEnv(x.stdout) || '')
		.catch(() => '');
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

function longest(arr) {
	return arr.reduce((a, b) => a.split(':').length > b.split(':').length ? a : b);
}

module.exports = () => {
	if (process.platform === 'win32') {
		return Promise.resolve(process.env.PATH);
	}

	return Promise.all([
		shellEnv().then(x => x.PATH),
		pathFromSudo()
	]).then(longest);
};

module.exports.sync = () => {
	if (process.platform === 'win32') {
		return process.env.PATH;
	}

	return longest([
		shellEnv.sync().PATH,
		pathFromSudoSync()
	]);
};
