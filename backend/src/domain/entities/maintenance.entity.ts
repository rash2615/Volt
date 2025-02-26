// Entity that represents a maintenance operation on a scooter
export class Maintenance {
    constructor(
      public readonly id: string,
      public readonly scooterId: string,
      public maintenanceDate: Date,
      public maintenanceType: 'Préventive' | 'Corrective',
      public description: string,
      public completed: boolean = false
    ) {}
  
    // Mark the maintenance as completed
    markAsCompleted() {
      this.completed = true;
    }
  }
  