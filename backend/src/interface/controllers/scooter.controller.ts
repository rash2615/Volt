import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ScooterService } from '../services/scooter.service';

@Controller('scooters') // Assurez-vous que la base de la route est bien définie ici
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  // ✅ Récupérer tous les scooters
  @Get()
  async getAllScooters() {
    return await this.scooterService.getAllScooters();
  }

  // ✅ Récupérer un scooter par ID
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

  // ✅ Supprimer un scooter par ID
  @Delete(':id')
  async deleteScooter(@Param('id') id: string) {
    return await this.scooterService.deleteScooter(id);
  }
}
