import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from '../services/clients.service';

describe('ClientsController', () => {
  let controller: ClientsController;

  const clientServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientsController, ClientsService],
    })
      .overrideProvider(ClientsService)
      .useValue(clientServiceMock)
      .compile();

    controller = module.get<ClientsController>(ClientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
