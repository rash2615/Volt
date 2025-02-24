import { Injectable } from '@nestjs/common';
import { Scooter } from '../../domain/entities/scooter.entity';
import { CheckScooterStatusUseCase } from '../../application/use-cases/check-scooter-status.usecase';

@Injectable()
export class ScooterService {
  private scooters: Scooter[] = [
    new Scooter('1', 'City 45', 30, new Date('2023-06-10')),
    new Scooter('2', 'Pro 60', 55, new Date('2022-12-10')),
  ];

  // Retourner la liste des scooters
  getAllScooters(): Scooter[] {
    return this.scooters;
  }

  // Vérifier le statut d'un scooter spécifique
  checkStatus(id: string): string {
    const scooter = this.scooters.find((s) => s.id === id);
    if (!scooter) {
      return 'Scooter introuvable';
    }

    const useCase = new CheckScooterStatusUseCase();
    return useCase.execute(scooter);
  }
}
