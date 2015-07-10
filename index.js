'use strict';
var childProcess = require('child_process');
var shell = process.env.SHELL || '/bin/sh';

module.exports = function (cb) {
	if (process.platform === 'win32') {
		setImmediate(cb, null, process.env.PATH);
		return;
	}

	childProcess.execFile(shell, ['-i', '-c', 'echo $PATH'], function (err, stdout) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, stdout.trim());
	});
};

module.exports.sync = function () {
	if (process.platform === 'win32') {
		return process.env.PATH;
	}

	return childProcess.execFileSync(shell, ['-c', 'echo $PATH']).toString().trim();
};
