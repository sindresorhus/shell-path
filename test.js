import test from 'ava';
import os from 'os';
import m from './';

test.cb('async', t => {
	m((err, p) => {
		t.ifError(err);
		t.true(p.indexOf('/usr/bin') !== -1);
		t.true(p.indexOf(os.EOL) === -1);
		t.end();
	});
});

test('sync', t => {
	var output = m.sync();
	t.true(output.indexOf('/usr/bin') !== -1);
	t.true(output.indexOf(os.EOL) === -1);
});
