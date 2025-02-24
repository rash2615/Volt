import { Controller, Get, Param } from '@nestjs/common';
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
  getAllScooters(): any {
    return this.scooterService.getAllScooters();
  }

  // Route GET /scooters/:id/status
  @Get('scooters/:id/status')
  getScooterStatus(@Param('id') id: string): string {
    return this.scooterService.checkStatus(id);
  }
}
