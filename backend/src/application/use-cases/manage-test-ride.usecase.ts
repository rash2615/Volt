import { TestRide } from '../../domain/entities/test-ride.entity';

export class ManageTestRideUseCase {
  private testRides: TestRide[] = [];

  scheduleTestRide(
    scooterId: string,
    customerName: string,
    startTime: Date,
    endTime: Date,
    location: string
  ): TestRide {
    const newTestRide = new TestRide(
      (this.testRides.length + 1).toString(),
      scooterId,
      customerName,
      startTime,
      endTime,
      location
    );

    this.testRides.push(newTestRide);
    return newTestRide;
  }

  reportIncident(testRideId: string, description: string): string {
    const testRide = this.testRides.find((ride) => ride.id === testRideId);
    if (!testRide) {
      return 'Essai introuvable';
    }

    testRide.reportIncident(description);
    return 'Incident signalé avec succès';
  }

  getAllTestRides(): TestRide[] {
    return this.testRides;
  }
}
