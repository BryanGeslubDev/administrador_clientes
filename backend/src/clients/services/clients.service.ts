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

  async create(createClientsDto: ClientDto[]): Promise<Clients[]> {
    const createdClients: Clients[] = [];

    for (const client of createClientsDto) {
      const id = client.id;
      const existingClient = await this.clientModel.findOne({
        where: {
          id,
        },
      });

      if (existingClient) {
        await this.clientModel.update(client, {
          where: {
            id,
          },
        });
      } else {
        const createdClient = await this.clientModel.create(client);
        createdClients.push(createdClient);
      }
    }

    return createdClients;
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
