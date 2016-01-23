import test from 'ava';
import os from 'os';
import m from './';

test.cb('async', t => {
	m((err, p) => {
		t.ifError(err);
		t.true(p.includes('/usr/bin'));
		t.true(!p.includes(os.EOL));
		t.end();
	});
});

test('sync', t => {
	var output = m.sync();
	t.true(output.includes('/usr/bin'));
	t.true(!output.includes(os.EOL));
});
