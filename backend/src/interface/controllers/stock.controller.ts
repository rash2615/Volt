import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StockService } from '../services/stock.service';
import { StockItem } from '../../infrastructure/database/schemas/stock.schema';

@Controller('stock') // 🚀 Assure-toi que cette ligne est bien là !
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  async getAllStockItems(): Promise<StockItem[]> {
    return this.stockService.getAllStockItems();
  }

  @Post()
  async createStockItem(@Body() stockData: Partial<StockItem>): Promise<StockItem> {
    return this.stockService.createStockItem(stockData);
  }

  @Put(':id')
  async updateStockItem(@Param('id') id: string, @Body() stockData: Partial<StockItem>): Promise<StockItem | null> {
    return this.stockService.updateStockItem(id, stockData);
  }

  @Delete(':id')
  async deleteStockItem(@Param('id') id: string): Promise<StockItem | null> {
    return this.stockService.deleteStockItem(id);
  }
}
