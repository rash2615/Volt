import { Module } from '@nestjs/common';
import { ScooterController } from './interface/controllers/scooter.controller';
import { ScooterService } from './interface/services/scooter.service';
import { MaintenanceController } from './interface/controllers/maintenance.controller';
import { StockController } from './interface/controllers/stock.controller';
import { TestRideController } from './interface/controllers/test-ride.controller';

@Module({
  imports: [],
  controllers: [
    ScooterController,
    MaintenanceController,
    StockController,
    TestRideController,
  ],
  providers: [ScooterService],
})
export class AppModule {}
