import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { MaintenanceService } from '../services/maintenance.service';
import { Maintenance } from '../../infrastructure/database/schemas/maintenance.schema';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  async scheduleMaintenance(
    @Body() body: { scooterId: string; scheduledDate: string; notes: string }
  ): Promise<Maintenance> {
    const { scooterId, scheduledDate, notes } = body;
    return this.maintenanceService.scheduleMaintenance(
      scooterId,
      new Date(scheduledDate),
      notes
    );
  }

  @Get()
  async getAllMaintenances(): Promise<Maintenance[]> {
    return this.maintenanceService.getAllMaintenances();
  }

  @Put(':id/complete')
  async completeMaintenance(@Param('id') id: string): Promise<Maintenance | null> {
    return this.maintenanceService.completeMaintenance(id);
  }
}
