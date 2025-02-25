import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScooterController } from './interface/controllers/scooter.controller';
import { ScooterService } from './interface/services/scooter.service';
import { Scooter, ScooterSchema } from './infrastructure/database/schemas/scooter.schema';
import { StockController } from './interface/controllers/stock.controller';
import { StockService } from './interface/services/stock.service';
import { StockItem, StockItemSchema } from './infrastructure/database/schemas/stock.schema';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://mongo:27017/voltride'),
    MongooseModule.forFeature([
      { name: Scooter.name, schema: ScooterSchema },
      { name: StockItem.name, schema: StockItemSchema }]),
  ],
  controllers: [ScooterController, StockController],
  providers: [ScooterService, StockService],
})
export class AppModule {}
