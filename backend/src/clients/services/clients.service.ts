import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Clients } from '../client.entity';
import { ClientDto } from '../dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Clients)
    private clientModel: typeof Clients,
  ) {}

  async findAll(): Promise<Clients[]> {
    return this.clientModel.findAll();
  }

  async findOne(id: string): Promise<Clients> {
    return this.clientModel.findOne({
      where: {
        id,
      },
    });
  }

  async create(createClientDto: ClientDto): Promise<Clients> {
    return this.clientModel.create(createClientDto);
  }

  async update(id: string, updateClientDto: ClientDto): Promise<Clients> {
    await this.clientModel.update(updateClientDto, {
      where: {
        id,
      },
    });

    return this.clientModel.findOne({
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.clientModel.destroy({
      where: {
        id,
      },
    });
  }
}
