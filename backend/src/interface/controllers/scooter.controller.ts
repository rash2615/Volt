import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { ScooterService } from '../services/scooter.service';

@Controller()
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  // Route par défaut pour /
  @Get()
  defaultRoute(): string {
    return 'Bienvenue sur l\'API VoltRide - Backend opérationnel 🚀';
  }

  // Route GET /scooters
  @Get('scooters')
  async getAllScooters(): Promise<any> {
    return await this.scooterService.getAllScooters();
  }

  // Route GET /scooters/:id/status
  @Get('scooters/:id/status')
  async getScooterStatus(@Param('id') id: string): Promise<string> {
    return await this.scooterService.checkStatus(id);
  }

  // Route POST /scooters
  @Post('scooters')
  async createScooter(@Body() scooterData: { model: string; batteryCycles: number; lastMaintenanceDate: Date }): Promise<any> {
    return await this.scooterService.createScooter(
      scooterData.model,
      scooterData.batteryCycles,
      new Date(scooterData.lastMaintenanceDate)
    );
  }



@Delete('scooters/:id')
async deleteScooter(@Param('id') id: string) {
  return this.scooterService.deleteScooter(id);
}

}