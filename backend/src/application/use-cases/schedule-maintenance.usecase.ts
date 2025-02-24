import { Maintenance } from '../../domain/entities/maintenance.entity';

export class ScheduleMaintenanceUseCase {
  private maintenances: Maintenance[] = [];

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

  getMaintenanceHistory(): Maintenance[] {
    return this.maintenances;
  }
}
