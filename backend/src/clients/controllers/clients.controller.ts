import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ClientsService } from '../services/clients.service';
import { Clients } from '../client.entity';
import { ClientDto } from '../dto/create-client.dto';

@Controller('/api/clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(): Promise<Clients[]> {
    return this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Clients> {
    return this.clientsService.findOne(id);
  }

  @Post()
  async create(@Body() createClientsDto: ClientDto[]): Promise<Clients[]> {
    return this.clientsService.create(createClientsDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: Clients,
  ): Promise<Clients> {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.clientsService.delete(id);
  }
}
