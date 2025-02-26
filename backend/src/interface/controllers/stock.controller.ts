import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { StockService } from '../services/stock.service';
import { StockItem } from '../../infrastructure/database/schemas/stock.schema';

@Controller('stock') 
export class StockController {
  constructor(private readonly stockService: StockService) {}

  // ✅ Récupérer tous les items en stock
  @Get()
  async getAllStockItems(): Promise<StockItem[]> {
    return this.stockService.getAllStockItems();
  }

  // ✅ Récupérer un item par ID
  @Post()
  async createStockItem(@Body() stockData: Partial<StockItem>): Promise<StockItem> {
    return this.stockService.createStockItem(stockData);
  }

  // ✅ Mettre à jour un item par ID
  @Put(':id')
  async updateStockItem(@Param('id') id: string, @Body() stockData: Partial<StockItem>): Promise<StockItem | null> {
    return this.stockService.updateStockItem(id, stockData);
  }

  // ✅ Supprimer un item par ID
  @Delete(':id')
  async deleteStockItem(@Param('id') id: string): Promise<StockItem | null> {
    return this.stockService.deleteStockItem(id);
  }
}
