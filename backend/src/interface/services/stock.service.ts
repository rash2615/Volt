import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StockItem, StockItemDocument } from '../../infrastructure/database/schemas/stock.schema';
import { NotificationService } from './notification.service';

@Injectable()
export class StockService {
  constructor(
    @InjectModel(StockItem.name) private stockModel: Model<StockItemDocument>,
    private notificationService: NotificationService,
  ) {}

  async getAllStockItems(): Promise<StockItem[]> {
    return this.stockModel.find().exec();
  }

  async createStockItem(data: Partial<StockItem>): Promise<StockItem> {
    const stockItem = new this.stockModel(data);
    return stockItem.save();
  }

  async updateStockItem(id: string, data: Partial<StockItem>): Promise<StockItem | null> {
    return this.stockModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteStockItem(id: string): Promise<StockItem | null> {
    return this.stockModel.findByIdAndDelete(id).exec();
  }

  // ✅ Ajout de la méthode de notifications
  async getNotifications(): Promise<string[]> {
    return this.notificationService.getNotifications();
  }
}
