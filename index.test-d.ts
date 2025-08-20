import {expectType} from 'tsd';
import {shellPath, shellPathSync} from './index.js';

expectType<Promise<string>>(shellPath());
expectType<string>(shellPathSync());
