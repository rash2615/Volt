export class ScooterEntity {
    constructor(
      public readonly id: string,
      public model: string,
      public batteryCycles: number,
      public lastMaintenanceDate: Date
    ) {}
  
    // Vérifie si le scooter a besoin de maintenance
    needsMaintenance(): boolean {
      return this.batteryCycles >= 50 || this.isOverdueForMaintenance();
    }
  
    // Vérifie si la date de maintenance dépasse les 6 mois
    private isOverdueForMaintenance(): boolean {
      const sixMonths = 1000 * 60 * 60 * 24 * 30 * 6; // 6 mois en ms
      return Date.now() - this.lastMaintenanceDate.getTime() > sixMonths;
    }
  }
  