import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { DATABASE } from 'src/config';

@Global()
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: DATABASE.DIALECT as Dialect,
      host: DATABASE.HOST,
      port: Number(DATABASE.PORT),
      username: DATABASE.USER,
      password: DATABASE.PASS,
      database: DATABASE.NAME,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
  ],
})
export class DatabaseModule {}
