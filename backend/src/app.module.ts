import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScooterController } from './interface/controllers/scooter.controller';
import { StockController } from './interface/controllers/stock.controller';
import { ScooterService } from './interface/services/scooter.service';
import { Scooter, ScooterSchema } from './infrastructure/database/schemas/scooter.schema';
import { StockService } from './interface/services/stock.service'; // ✅ Import du service de stock
import { StockItem, StockItemSchema } from './infrastructure/database/schemas/stock.schema'; // ✅ Import du modèle de stock

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://mongo:27017/voltride'),
    MongooseModule.forFeature([
      { name: 'Scooter', schema: ScooterSchema },
      { name: 'StockItem', schema: StockItemSchema }, // ✅ Ajout du modèle de stock
    ]),
  ],
  controllers: [ScooterController, StockController],
  providers: [ScooterService, StockService], // ✅ Ajout du service de stock
})
export class AppModule {}
