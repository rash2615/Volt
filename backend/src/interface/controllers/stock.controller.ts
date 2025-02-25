import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { StockService } from '../services/stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('notifications')
  async getNotifications() {
    return this.stockService.getNotifications();
  }
}
