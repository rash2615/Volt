import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScooterController } from './interface/controllers/scooter.controller';
import { ScooterService } from './interface/services/scooter.service';
import { Scooter, ScooterSchema } from './infrastructure/database/schemas/scooter.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://mongo:27017/voltride'),
    MongooseModule.forFeature([{ name: 'Scooter', schema: ScooterSchema }]), // Importation du modèle
  ],
  controllers: [ScooterController],
  providers: [ScooterService],
})
export class AppModule {}
