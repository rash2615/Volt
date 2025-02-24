export class Scooter {
    constructor(
      public readonly id: string,
      public model: string,
      public batteryCycles: number,
      public lastMaintenanceDate: Date
    ) {}
  
    needsMaintenance(): boolean {
      return this.batteryCycles >= 50 || this.isOverdueForMaintenance();
    }
  
    private isOverdueForMaintenance(): boolean {
      const sixMonths = 1000 * 60 * 60 * 24 * 30 * 6;
      return Date.now() - this.lastMaintenanceDate.getTime() > sixMonths;
    }
  }
  