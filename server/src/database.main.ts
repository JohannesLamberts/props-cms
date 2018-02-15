import { Collections }    from 'props-cms.connector-common';
import { ENV }            from './env';
import { DatabaseModule } from './modules/database/db.module';

export const DefinitionsDb
                 = DatabaseModule.connect<Collections>
                                 (ENV.db.name,
                                  ENV.db.auth);