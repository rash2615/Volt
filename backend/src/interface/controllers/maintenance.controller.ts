import { Controller, Post, Body, Get } from '@nestjs/common';
import { ScheduleMaintenanceUseCase } from '../../application/use-cases/schedule-maintenance.usecase';
import { NotificationService } from '../../infrastructure/notifications/notification.service';

@Controller('maintenance')
export class MaintenanceController {
  private scheduleMaintenanceUseCase = new ScheduleMaintenanceUseCase();
  private notificationService = new NotificationService();

  @Post()
  schedule(@Body() maintenanceData: { scooterId: string; type: string; description: string }) {
    const maintenance = this.scheduleMaintenanceUseCase.scheduleMaintenance(
      maintenanceData.scooterId,
      maintenanceData.type as 'Préventive' | 'Corrective',
      maintenanceData.description
    );

    this.notificationService.sendNotification(
      'Gestionnaire de flotte',
      `Maintenance planifiée pour le scooter ID ${maintenance.scooterId}`
    );

    return maintenance;
  }

  @Get('history')
  getMaintenanceHistory() {
    return this.scheduleMaintenanceUseCase.getMaintenanceHistory();
  }
}
