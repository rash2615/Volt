import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockItem, StockItemDocument } from '../../infrastructure/database/schemas/stock.schema';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(StockItem.name) private stockModel: Model<StockItemDocument>,
  ) {}

  async getAllStockItems(): Promise<StockItem[]> {
    return this.stockModel.find().exec();
  }

  async createStockItem(data: Partial<StockItem>): Promise<StockItem> {
    const newItem = new this.stockModel(data);
    return newItem.save();
  }

  async updateStockItem(id: string, data: Partial<StockItem>): Promise<StockItem | null> {
    return this.stockModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteStockItem(id: string): Promise<StockItem | null> {
    return this.stockModel.findByIdAndDelete(id).exec();
  }
}
