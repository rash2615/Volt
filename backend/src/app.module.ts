import { Module } from '@nestjs/common';
import { ScooterController } from './interface/controllers/scooter.controller';
import { ScooterService } from './services/scooter.service';

@Module({
  imports: [],
  controllers: [ScooterController],
  providers: [ScooterService],
})
export class AppModule {}
