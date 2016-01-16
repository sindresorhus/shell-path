import test from 'ava';
import m from './';

test.cb('async', t => {
	m((err, p) => {
		t.ifError(err);
		t.true(p.indexOf('/usr/bin') !== -1);
		t.end();
	});
});

test('sync', t => {
	t.true(m.sync().indexOf('/usr/bin') !== -1);
});
