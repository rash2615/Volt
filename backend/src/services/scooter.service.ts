import { Injectable } from '@nestjs/common';

@Injectable()
export class ScooterService {
  getScooters(): string {
    return 'Liste des scooters';
  }
}
