import {expectType} from 'tsd';
import {shellPath, shellPathSync} from './index.js';

expectType<Promise<string>>(shellPath());
expectType<Promise<string>>(shellPath({shell: '/bin/bash'}));
expectType<string>(shellPathSync());
expectType<string>(shellPathSync({shell: '/bin/bash'}));
