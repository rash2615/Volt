import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MaintenanceService } from '../services/maintenance.service';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  // ✅ Planifier une maintenance
  @Post()
  async scheduleMaintenance(
    @Body() maintenanceData: { scooterId: string; scheduledDate: Date; description: string }
  ): Promise<string> {
    return await this.maintenanceService.scheduleMaintenance(
      maintenanceData.scooterId,
      maintenanceData.scheduledDate,
      maintenanceData.description 
    );
  }

  // ✅ Récupérer toutes les maintenances
  @Get()
  async getAllMaintenance() {
    return await this.maintenanceService.getAllMaintenance();
  }

  // ✅ Marquer une maintenance comme terminée
  @Post(':id/complete')
  async completeMaintenance(@Param('id') id: string): Promise<string> {
    return await this.maintenanceService.completeMaintenance(id);
  }
}
