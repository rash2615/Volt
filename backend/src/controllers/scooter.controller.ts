import { Controller, Get } from '@nestjs/common';
import { ScooterService } from '../services/scooter.service';

@Controller()
export class ScooterController {
  constructor(private readonly scooterService: ScooterService) {}

  // Route par défaut (GET /)
  @Get()
  defaultRoute(): string {
    return 'VoltRide Backend API - Welcome!';
  }

  // Route pour les scooters (GET /scooters)
  @Get('scooters')
  findAll(): string {
    return this.scooterService.getScooters();
  }
}
