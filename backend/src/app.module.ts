import { Module } from '@nestjs/common';
import { ScooterController } from './interface/controllers/scooter.controller';
import { ScooterService } from './interface/services/scooter.service';
import { MaintenanceController } from './interface/controllers/maintenance.controller';

@Module({
  imports: [],
  controllers: [ScooterController, MaintenanceController],
  providers: [ScooterService],
})
export class AppModule {}
