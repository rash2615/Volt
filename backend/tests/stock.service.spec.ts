import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from '../src/interface/services/stock.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockItem } from '../src/infrastructure/database/schemas/stock.schema';

const mockStockItem = {
  _id: '123',
  name: 'Batterie',
  quantity: 10,
  lastRestocked: new Date(),
};

const stockModelMock = {
  find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockStockItem]) }),
  findById: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(mockStockItem) }),
  create: jest.fn().mockResolvedValue(mockStockItem),
  findByIdAndUpdate: jest.fn().mockResolvedValue(mockStockItem),
  findByIdAndDelete: jest.fn().mockResolvedValue(mockStockItem),
};

describe('StockService', () => {
  let service: StockService;
  let model: Model<StockItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockService,
        { provide: getModelToken('StockItem'), useValue: stockModelMock },
      ],
    }).compile();

    service = module.get<StockService>(StockService);
    model = module.get<Model<StockItem>>(getModelToken('StockItem'));
  });

  it('should return all stock items', async () => {
    const result = await service.getAllStockItems();
    expect(result).toEqual([mockStockItem]);
  });

  it('should create a stock item', async () => {
    const result = await service.createStockItem(mockStockItem);
    expect(result).toEqual(mockStockItem);
  });

  it('should update a stock item', async () => {
    const result = await service.updateStockItem('123', { quantity: 15 });
    expect(result?.quantity).toEqual(10);
  });

  it('should delete a stock item', async () => {
    const result = await service.deleteStockItem('123');
    expect(result).toEqual(mockStockItem);
  });
});
