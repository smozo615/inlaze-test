import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import config from '../config';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, name, password, port, user } = configService.database;
        return {
          dialect: 'postgres',
          host,
          port: +port,
          username: user,
          password,
          database: name,
          models: [],
        };
      },
      inject: [config.KEY],
    }),
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
