export class TestRide {
    constructor(
      public readonly id: string,
      public readonly scooterId: string,
      public readonly customerName: string,
      public readonly startTime: Date,
      public readonly endTime: Date,
      public location: string,
      public incidentReport?: string
    ) {}
  
    // Report an incident during the test ride
    reportIncident(description: string) {
      this.incidentReport = description;
    }
  }
  