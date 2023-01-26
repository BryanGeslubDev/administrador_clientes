import { Module } from '@nestjs/common';
import { ClientsService } from './services/clients.service';
import { ClientsController } from './controllers/clients.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import { Clients } from './client.entity';

@Module({
  imports: [SequelizeModule.forFeature([Clients])],
  providers: [ClientsService],
  controllers: [ClientsController],
})
export class ClientsModule {}
