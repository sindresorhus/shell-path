'use strict';
var childProcess = require('child_process');
var shell = process.env.SHELL || '/bin/sh';

module.exports = function (cb) {
	if (process.platform === 'win32') {
		throw new Error('Not supported on Windows');
	}

	childProcess.execFile(shell, ['-c', 'echo $PATH'], function (err, stdout) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, stdout.trim());
	});
};

module.exports.sync = function () {
	if (process.platform === 'win32') {
		throw new Error('Not supported on Windows');
	}

	return childProcess.execFileSync(shell, ['-c', 'echo $PATH']).toString().trim();
};
