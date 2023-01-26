import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Clients } from '../client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Clients)
    private ClientsModel: typeof Clients,
  ) {}

  findAll() {
    return this.ClientsModel.findAll();
  }

  findOne(id: number) {
    return this.ClientsModel.findByPk(id);
  }

  async create(body: any) {
    const newClient = await this.ClientsModel.create(body);
    return this.ClientsModel.findByPk(newClient.id);
  }

  update(id: Clients['id']) {
    return this.ClientsModel.findByPk(id);
  }

  async delete(id: number) {
    await this.ClientsModel.destroy({
      where: {
        id,
      },
    });
    return true;
  }
}
