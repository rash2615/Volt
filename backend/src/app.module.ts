import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScooterController } from './interface/controllers/scooter.controller';
import { ScooterService } from './interface/services/scooter.service';
import { Scooter, ScooterSchema } from './infrastructure/database/schemas/scooter.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://mongo:27017/voltride'),
    MongooseModule.forFeature([{ name: Scooter.name, schema: ScooterSchema }]),
  ],
  controllers: [ScooterController],
  providers: [ScooterService],
})
export class AppModule {}
