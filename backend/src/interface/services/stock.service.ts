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

  async createStockItem(stockData: Partial<StockItem>): Promise<StockItem> {
    const newItem = new this.stockModel(stockData);
    return newItem.save();
  }

  async updateStockItem(id: string, stockData: Partial<StockItem>): Promise<StockItem | null> {
    return this.stockModel.findByIdAndUpdate(id, stockData, { new: true }).exec();
  }

  async deleteStockItem(id: string): Promise<StockItem | null> {
    return this.stockModel.findByIdAndDelete(id).exec();
  }

  async usePart(partId: string, quantity: number): Promise<string> {
    const item = await this.stockModel.findById(partId).exec();

    if (!item) {
      return '❌ Pièce non trouvée.';
    }

    if (item.quantity < quantity) {
      return '❌ Stock insuffisant.';
    }

    item.quantity -= quantity;
    await item.save();

    if (item.quantity <= 5) {
      return `⚠️ Attention, le stock de ${item.name} est faible.`;
    }

    return `${quantity} ${item.name}(s) utilisé(s) avec succès.`;
  }
}
