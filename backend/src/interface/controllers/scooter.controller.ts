import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ScooterService } from '../services/scooter.service';

@Controller('scooters')
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Get()
  async getAllScooters(): Promise<any> {
    return this.scooterService.getAllScooters();
  }

  @Get(':id/status')
  async getScooterStatus(@Param('id') id: string): Promise<string> {
    return this.scooterService.checkStatus(id);
  }

  @Post()
  async createScooter(@Body() scooterData: { model: string; batteryCycles: number; lastMaintenanceDate: Date }): Promise<any> {
    return this.scooterService.createScooter(
      scooterData.model,
      scooterData.batteryCycles,
      new Date(scooterData.lastMaintenanceDate)
    );
  }

  @Delete(':id')
  async deleteScooter(@Param('id') id: string): Promise<string> {
    return this.scooterService.deleteScooter(id);
  }
}
