import { Scooter } from '../../domain/entities/scooter.entity';

export class CheckScooterStatusUseCase {
  execute(scooter: Scooter): string {
    return scooter.needsMaintenance()
      ? 'Maintenance requise'
      : 'Scooter opérationnel';
  }
}
