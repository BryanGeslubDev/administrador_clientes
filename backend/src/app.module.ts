import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ClientsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
