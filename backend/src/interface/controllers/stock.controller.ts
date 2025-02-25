// src/interface/controllers/stock.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { StockService } from '../services/stock.service';
import { StockItem } from '../../infrastructure/database/schemas/stock.schema';

@Controller('stock')
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
  async updateStockItem(@Param('id') id: string, @Body() stockData: Partial<StockItem>): Promise<StockItem> {
    const updatedItem = await this.stockService.updateStockItem(id, stockData);
    if (!updatedItem) {
      throw new NotFoundException(`Le stock avec l'ID ${id} n'a pas été trouvé.`);
    }
    return updatedItem;
  }

  @Delete(':id')
  async deleteStockItem(@Param('id') id: string): Promise<StockItem> {
    const deletedItem = await this.stockService.deleteStockItem(id);
    if (!deletedItem) {
      throw new NotFoundException(`Le stock avec l'ID ${id} n'a pas été trouvé.`);
    }
    return deletedItem;
  }
}
