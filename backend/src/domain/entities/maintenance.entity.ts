export class Maintenance {
    constructor(
      public readonly id: string,
      public readonly scooterId: string,
      public maintenanceDate: Date,
      public maintenanceType: 'Préventive' | 'Corrective',
      public description: string,
      public completed: boolean = false
    ) {}
  
    markAsCompleted() {
      this.completed = true;
    }
  }
  