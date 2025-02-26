import { Maintenance } from '../../domain/entities/maintenance.entity';

// Use case for scheduling maintenance
export class ScheduleMaintenanceUseCase {
  private maintenances: Maintenance[] = [];

  // Schedule maintenance for a scooter
  scheduleMaintenance(
    scooterId: string,
    type: 'Préventive' | 'Corrective',
    description: string
  ): Maintenance {
    const newMaintenance = new Maintenance(
      (this.maintenances.length + 1).toString(),
      scooterId,
      new Date(),
      type,
      description
    );

    this.maintenances.push(newMaintenance);
    return newMaintenance;
  }

  // Get maintenance history for a scooter
  getMaintenanceHistory(): Maintenance[] {
    return this.maintenances;
  }
}
