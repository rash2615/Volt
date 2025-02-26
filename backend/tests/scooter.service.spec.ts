import { Test, TestingModule } from '@nestjs/testing';
import { ScooterService } from '../src/interface/services/scooter.service';
import { getModelToken } from '@nestjs/mongoose';
import { ScooterDocument } from '../src/infrastructure/database/schemas/scooter.schema';
import { Model } from 'mongoose';
import { ScooterEntity } from '../src/domain/entities/scooter.entity';

const mockScooter = {
  _id: 'testId',
  model: 'Test Model',
  batteryCycles: 10,
  lastMaintenanceDate: new Date(),
};

const mockScooterModel = {
  find: jest.fn().mockResolvedValue([mockScooter]),
  findById: jest.fn().mockResolvedValue(mockScooter),
  create: jest.fn().mockResolvedValue(mockScooter),
  findOneAndDelete: jest.fn().mockResolvedValue(mockScooter),
};

describe('ScooterService', () => {
  let service: ScooterService;
  let model: Model<ScooterDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ScooterService,
        {
          provide: getModelToken('Scooter'),
          useValue: mockScooterModel,
        },
      ],
    }).compile();

    service = module.get<ScooterService>(ScooterService);
    model = module.get<Model<ScooterDocument>>(getModelToken('Scooter'));
  });

  it('should return all scooters', async () => {
    const result = await service.getAllScooters();
    expect(result).toHaveLength(1);
    expect(result[0].model).toEqual('Test Model');
  });

  it('should return a single scooter by ID', async () => {
    const result = await service.checkStatus('testId');
    expect(result).toBeDefined();
  });

  it('should create a new scooter', async () => {
    const result = await service.createScooter('New Model', 5, new Date());
    expect(result.model).toEqual('Test Model');
  });

  it('should delete a scooter by ID', async () => {
    const result = await service.deleteScooter('testId');
    expect(result).toEqual('Scooter supprimé avec succès');
  });
});
