import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockItem, StockItemDocument } from '../../infrastructure/database/schemas/stock.schema';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(StockItem.name) private stockModel: Model<StockItemDocument>
  ) {}

  // ✅ Récupérer tous les items en stock
  async getAllStockItems(): Promise<StockItem[]> {
    return this.stockModel.find().exec();
  }

  // ✅ Récupérer un item par ID
  async createStockItem(stockData: Partial<StockItem>): Promise<StockItem> {
    const newStock = new this.stockModel(stockData);
    return newStock.save();
  }

  // ✅ Mettre à jour un item par ID
  async updateStockItem(id: string, stockData: Partial<StockItem>): Promise<StockItem | null> {
    return this.stockModel.findByIdAndUpdate(id, stockData, { new: true });
  }

  // ✅ Supprimer un item par ID
  async deleteStockItem(id: string): Promise<StockItem | null> {
    return this.stockModel.findByIdAndDelete(id);
  }

  // ✅ Récupérer les notifications de stock
  async getStockNotifications(): Promise<{ message: string }[]> {
    const lowStockItems = await this.stockModel.find({ quantity: { $lt: 5 } });
    return lowStockItems.map((item) => ({ message: `⚠️ Stock faible: ${item.name} (${item.quantity} restants)` }));
  }
}
