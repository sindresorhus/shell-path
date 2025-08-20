import test from 'ava';
import {shellPath, shellPathSync} from './index.js';

test('async', async t => {
	const PATH = await shellPath();
	t.true(PATH.includes('/usr/bin'));
	t.false(PATH.includes('\n'));
});

test('async with options', async t => {
	const PATH = await shellPath({shell: '/bin/bash'});
	t.true(PATH.includes('/usr/bin'));
	t.false(PATH.includes('\n'));
});

test('sync', t => {
	const PATH = shellPathSync();
	t.true(PATH.includes('/usr/bin'));
	t.false(PATH.includes('\n'));
});

test('sync with options', t => {
	const PATH = shellPathSync({shell: '/bin/bash'});
	t.true(PATH.includes('/usr/bin'));
	t.false(PATH.includes('\n'));
});
