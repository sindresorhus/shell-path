'use strict';

var childProcess = require('child_process');
var shell = process.env.SHELL || '/bin/sh';
var path = process.env.PATH;
var user = process.env.USER;
var opts = {encoding: 'utf8'};

module.exports = function (cb) {
	if (process.platform === 'win32') {
		setImmediate(cb, null, path);
		return;
	}
	pathFromShell(function (err, p1) {
		if (err) {
			cb(err);
			return;
		}

		pathFromSudo(function (err, p2) {
			if (err) {
				cb(err);
				return;
			}

			// return the longest found path
			cb(null, longest([p1, p2, path]));
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
	return longest([p1, p2, path]);
};

function pathFromShell(cb) {
	childProcess.execFile(shell, ['-i', '-c', 'echo "$PATH"'], opts, function (err, stdout) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, stdout.trim());
	});
}

function pathFromShellSync() {
	return childProcess.execFileSync(shell, ['-i', '-c', 'echo "$PATH"'], opts).trim();
}

function pathFromSudo(cb) {
	childProcess.exec('sudo -Hiu ' + user + ' echo "$PATH"', opts, function (err, stdout) {
		if (err) {
			// may fail with 'sudo: must be setuid root'
			cb(null, '');
		}

		cb(null, stdout.trim());
	});
}

function pathFromSudoSync() {
	try {
		return childProcess.execSync('sudo -Hiu ' + user + ' echo "$PATH"', opts).trim();
	} catch (err) {
		// may fail with 'sudo: must be setuid root'
		return '';
	}
}

function longest(arr) {
	return arr.reduce(function (a, b) {
		return a.length > b.length ? a : b;
	});
}
