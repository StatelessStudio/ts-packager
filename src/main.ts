import { bootstrap } from './bootstrap';
import { bundle } from './bundle';
import { configFile } from './environment';

bootstrap(bundle(configFile.files));
