import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ManageTestRideUseCase } from '../../application/use-cases/manage-test-ride.usecase';

@Controller('test-rides')
export class TestRideController {
  private testRideManager = new ManageTestRideUseCase();

  @Post('schedule')
  scheduleTestRide(@Body() body: {
    scooterId: string;
    customerName: string;
    startTime: string;
    endTime: string;
    location: string;
  }) {
    const ride = this.testRideManager.scheduleTestRide(
      body.scooterId,
      body.customerName,
      new Date(body.startTime),
      new Date(body.endTime),
      body.location
    );
    return ride;
  }

  @Post('incident/:id')
  reportIncident(@Param('id') id: string, @Body() body: { description: string }) {
    return { message: this.testRideManager.reportIncident(id, body.description) };
  }

  @Get()
  getAllTestRides() {
    return this.testRideManager.getAllTestRides();
  }
}
