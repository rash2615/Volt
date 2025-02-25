// src/interface/services/stock.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const updatedItem = await this.stockModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updatedItem) {
      throw new NotFoundException(`Stock non trouvé avec l'ID ${id}`);
    }
    return updatedItem;
  }

  async deleteStockItem(id: string): Promise<StockItem | null> {
    const deletedItem = await this.stockModel.findByIdAndDelete(id).exec();
    if (!deletedItem) {
      throw new NotFoundException(`Stock non trouvé avec l'ID ${id}`);
    }
    return deletedItem;
  }
}
