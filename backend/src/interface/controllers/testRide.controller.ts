import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TestRideService } from '../services/testRide.service';
import { TestRide } from '../../infrastructure/database/schemas/testRide.schema';

@Controller('test-rides')
export class TestRideController {
  constructor(private readonly testRideService: TestRideService) {}

  @Get()
  async getAllTestRides(): Promise<TestRide[]> {
    return this.testRideService.getAllTestRides();
  }

  @Post()
  async createTestRide(@Body() data: Partial<TestRide>): Promise<TestRide> {
    return this.testRideService.createTestRide(data);
  }

  @Put(':id')
  async updateTestRide(@Param('id') id: string, @Body() data: Partial<TestRide>): Promise<TestRide | null> {
    return this.testRideService.updateTestRide(id, data);
  }

  @Delete(':id')
  async deleteTestRide(@Param('id') id: string): Promise<TestRide | null> {
    return this.testRideService.deleteTestRide(id);
  }
}