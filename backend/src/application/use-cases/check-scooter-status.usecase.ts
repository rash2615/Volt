import { ScooterEntity } from '../../domain/entities/scooter.entity';

// Use case for checking the status of a scooter
export class CheckScooterStatusUseCase {
  execute(scooter: ScooterEntity): string {
    return scooter.needsMaintenance()
      ? 'Maintenance requise'
      : 'Scooter opérationnel';
  }
}
