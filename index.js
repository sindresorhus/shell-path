'use strict';
var childProcess = require('child_process');
var stripAnsi = require('strip-ansi');
var delimiter = require('path').delimiter;
var os = require('os');
var shell = process.env.SHELL || '/bin/sh';
var user = process.env.USER;
var opts = {encoding: 'utf8'};

module.exports = function (cb) {
	if (process.platform === 'win32') {
		setImmediate(cb, null, process.env.PATH);
		return;
	}

	var todo = [pathFromShell, pathFromSudo];
	var results = [];
	todo.forEach(function (fn) {
		fn(function (path) {
			results.push(path);
			if (results.length === todo.length) {
				// return the longest found path
				cb(null, longest(results.concat(process.env.PATH)));
			}
		});
	});
};

module.exports.sync = function () {
	if (process.platform === 'win32') {
		return process.env.PATH;
	}

	var p1 = pathFromShellSync();
	var p2 = pathFromSudoSync();
	// return the longest found path
	return longest([p1, p2, process.env.PATH]);
};

function pathFromShell(cb) {
	childProcess.execFile(shell, ['-i', '-c', 'echo "$PATH"'], opts, function (err, stdout) {
		if (err) {
			cb('');
			return;
		}

		cb(clean(stdout) || '');
	});
}

function pathFromShellSync() {
	return clean(childProcess.execFileSync(shell, ['-i', '-c', 'echo "$PATH"'], opts)) || '';
}

function pathFromSudo(cb) {
	childProcess.execFile('sudo', ['-Hiu', user, 'env'], opts, function (err, stdout) {
		if (err) {
			// may fail with 'sudo: must be setuid root'
			cb('');
			return;
		}

		cb(parseEnv(clean(stdout, true)) || '');
	});
}

function pathFromSudoSync() {
	try {
		return parseEnv(clean(childProcess.execFileSync('sudo', ['-Hiu', user, 'env'], opts), true)) || '';
	} catch (err) {
		// may fail with 'sudo: must be setuid root'
		return '';
	}
}

function parseEnv(env) {
	var pathLine = env.trim().split(os.EOL).filter(function (line) {
		return /^PATH=/.test(line.trim());
	})[0];

	if (!pathLine) {
		return '';
	}

	return pathLine.split('=')[1] || '';
}

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

function longest(arr) {
	return arr.reduce(function (a, b) {
		return a.split(delimiter).length > b.split(delimiter).length ? a : b;
	});
}
