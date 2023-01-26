import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Res,
} from '@nestjs/common';
import { api_error } from 'src/utils/errors/controllerError';
import { Clients } from '../client.entity';
import { ClientsService } from '../services/clients.service';
import { ClientDto } from '../dto/create-client.dto';

@Controller('api/clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  async getAll(@Res() res) {
    try {
      const clients = await this.clientsService.findAll();
      console.log('Devolvemos todo');
      return res.json({
        message: `Clientes encontrados: ${clients.length}`,
        data: clients,
      });
    } catch (e) {
      console.log('error', e);
      res.status(500).json({
        message: api_error,
      });
    }
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.clientsService.findOne(id);
  }

  @Post()
  create(@Body() body: ClientDto) {
    return this.clientsService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Clients) {
    const updateClient = await this.clientsService.findOne(id);
    console.log(body);

    await updateClient.update(body);
    return this.clientsService.update(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.clientsService.delete(id);
  }
}
