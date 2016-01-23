import os from 'os';
import test from 'ava';
import m from './';

test('async', async t => {
	const PATH = await m();
	t.true(PATH.includes('/usr/bin'));
	t.false(PATH.includes(os.EOL));
});

test('sync', t => {
	const PATH = m.sync();
	t.true(PATH.includes('/usr/bin'));
	t.false(PATH.includes(os.EOL));
});
