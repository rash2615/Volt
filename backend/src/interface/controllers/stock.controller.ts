import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ManageStockUseCase } from '../../application/use-cases/manage-stock.usecase';
import { NotificationService } from '../../infrastructure/notifications/notification.service';

@Controller('stock')
export class StockController {
  private stockManager = new ManageStockUseCase();
  private notificationService = new NotificationService();

  @Get()
  getInventory() {
    return this.stockManager.getInventory();
  }

  @Post('use')
  usePart(@Body() body: { partId: string; quantity: number }) {
    const result = this.stockManager.usePart(body.partId, body.quantity);

    if (result.includes('⚠️ Attention')) {
      this.notificationService.sendNotification(
        'Gestionnaire de stock',
        result
      );
    }

    return { message: result };
  }
}
