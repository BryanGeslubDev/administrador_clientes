import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Clients } from '../client.entity';
import { ClientsService } from './clients.service';
import { faker } from '@faker-js/faker';

const clientInput = {
  firstName: faker.lorem.words(1),
  lastName: faker.lorem.words(1),
  age: 25,
  address: faker.lorem.words(1),
};

describe('ClientsService', () => {
  let service: ClientsService;
  let model: typeof Clients;

  const testClient = {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    age: 5,
    address: 'Rancagua',
  };
  const updateClient = {
    firstName: 'John',
    lastName: 'Doe',
    age: 5,
    address: 'Rancagua',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getModelToken(Clients),
          useValue: {
            findAll: jest.fn(() => testClient),
            create: jest.fn(() => testClient),
            update: jest.fn(() => updateClient),
            findOne: jest.fn(() => testClient),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    model = module.get<typeof Clients>(getModelToken(Clients));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Deberia retornar todos los clientes', async () => {
    const result = await service.findAll();
    expect(result).toEqual(testClient);
  });

  it('Deberia buscar 1 cliente por id', async () => {
    const id = '1';
    const client = await service.findOne(id);
    const findOneSpy = jest.spyOn(model, 'findOne');
    expect(findOneSpy).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
    expect(client).toEqual(testClient);
  });

  it('Debería crear un cliente', async () => {
    const client = await service.create(clientInput);
    const createSpy = jest.spyOn(model, 'create');
    expect(createSpy).toBeCalledWith(clientInput);
    expect(client).toEqual(testClient);
  });

  it('deberia actualizar cliente y retornarlo', async () => {
    const id = '1';
    await service.update(id, updateClient);
    const updateSpy = jest.spyOn(model, 'update');
    expect(updateSpy).toHaveBeenCalledWith(updateClient, { where: { id } });
  });

  it('Deberia eliminar un cliente por id', async () => {
    const id = '1';
    await service.delete(id);
    expect(model.destroy).toHaveBeenCalledWith({
      where: {
        id,
      },
    });
  });
});
