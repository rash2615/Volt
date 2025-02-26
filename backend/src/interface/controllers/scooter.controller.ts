import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ScooterService } from '../services/scooter.service';

@Controller('scooters') // Assurez-vous que la base de la route est bien définie ici
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  @Get()
  async getAllScooters() {
    return await this.scooterService.getAllScooters();
  }

  @Post()
  async createScooter(@Body() scooterData: { model: string; batteryCycles: number; lastMaintenanceDate: Date }) {
    return await this.scooterService.createScooter(
      scooterData.model,
      scooterData.batteryCycles,
      new Date(scooterData.lastMaintenanceDate)
    );
  }

  @Put(':id') // ✅ Ajout de la route PUT
  async updateScooter(
    @Param('id') id: string,
    @Body() updateData: { model?: string; batteryCycles?: number; lastMaintenanceDate?: Date }
  ) {
    return await this.scooterService.updateScooter(id, updateData);
  }

  @Delete(':id')
  async deleteScooter(@Param('id') id: string) {
    return await this.scooterService.deleteScooter(id);
  }
}
