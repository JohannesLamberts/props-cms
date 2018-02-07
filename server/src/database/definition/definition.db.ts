import { Collections }    from '../../models/_collections';
import { ENV }            from '../../env';
import { DatabaseModule } from '../../modules/database/db.module';

export const DefinitionsDb
                 = DatabaseModule.connect<Collections>
                                 ('choreon',
                                  ENV.db.auth);