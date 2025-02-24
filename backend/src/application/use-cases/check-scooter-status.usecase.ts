import { ScooterEntity } from '../../domain/entities/scooter.entity';

export class CheckScooterStatusUseCase {
  execute(scooter: ScooterEntity): string {
    return scooter.needsMaintenance()
      ? 'Maintenance requise'
      : 'Scooter opérationnel';
  }
}
