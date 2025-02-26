import { TestRide } from '../../domain/entities/test-ride.entity';

// Use case for managing test rides
export class ManageTestRideUseCase {
  private testRides: TestRide[] = [];

  // Schedule a test ride
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

  // Report a test ride
  reportIncident(testRideId: string, description: string): string {
    const testRide = this.testRides.find((ride) => ride.id === testRideId);
    if (!testRide) {
      return 'Essai introuvable';
    }

    testRide.reportIncident(description);
    return 'Incident signalé avec succès';
  }

  // Get all test rides
  getAllTestRides(): TestRide[] {
    return this.testRides;
  }
}
