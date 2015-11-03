'use strict';
var test = require('ava');
var shellPath = require('./');

test('async', function (t) {
	t.plan(1);
	shellPath(function (err, p) {
		t.assert(err === null);
		t.assert(p.indexOf('/usr/bin') !== -1, p);
	});
});

test('sync', function (t) {
	t.plan(1);
	var p = shellPath.sync();
	t.assert(p.indexOf('/usr/bin') !== -1, p);
});
