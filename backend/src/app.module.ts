import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScooterController } from './interface/controllers/scooter.controller';
import { ScooterService } from './interface/services/scooter.service';
import { Scooter, ScooterSchema } from './infrastructure/database/schemas/scooter.schema';
import { StockController } from './interface/controllers/stock.controller';
import { StockService } from './interface/services/stock.service';
import { StockItem, StockItemSchema } from './infrastructure/database/schemas/stock.schema';
import { NotificationService } from './interface/services/notification.service'; 
import { MaintenanceController } from './interface/controllers/maintenance.controller';
import { MaintenanceService } from './interface/services/maintenance.service';
import { Maintenance, MaintenanceSchema } from './infrastructure/database/schemas/maintenance.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://mongo:27017/voltride'),
    MongooseModule.forFeature([
      { name: Scooter.name, schema: ScooterSchema },
      { name: StockItem.name, schema: StockItemSchema },
      { name: Maintenance.name, schema: MaintenanceSchema }])
  ],
  controllers: [ScooterController, StockController, MaintenanceController],
  providers: [ScooterService, StockService, MaintenanceService, NotificationService],
})
export class AppModule {}
