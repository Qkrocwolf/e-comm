import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/user.model';
import { Token } from '../token/token.model';

export const getSequelConfig = async (
  config: ConfigService,
): Promise<SequelizeModuleOptions> => {
  return {
    dialect: config.get('SEQUEL_DIALECT'),
    host: config.get('SEQUEL_HOST'),
    port: config.get('SEQUEL_PORT'),
    username: config.get('SEQUEL_USERNAME'),
    password: config.get('SEQUEL_PASSWORD'),
    database: config.get('SEQUEL_DATABASE'),
    autoLoadModels: true,
    synchronize: true,
    models: [User, Token],
  };
};
