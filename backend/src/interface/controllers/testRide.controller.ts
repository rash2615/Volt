import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TestRideService } from '../services/testRide.service';
import { CreateTestRideDto, UpdateTestRideDto } from '../../application/dto/testRide.dto';

@Controller('test-rides') 
export class TestRideController {
  constructor(private readonly testRideService: TestRideService) {}

  // ✅ Récupérer tous les test rides
  @Get()
  async getAllTestRides() {
    return await this.testRideService.getAllTestRides();
  }

  // ✅ Récupérer un test ride par ID
  @Get(':id')
  async getTestRideById(@Param('id') id: string) {
    return await this.testRideService.getTestRideById(id);
  }

  // ✅ Création d'un test ride
  @Post()
  async createTestRide(@Body() createTestRideDto: CreateTestRideDto) {
    return await this.testRideService.createTestRide(createTestRideDto);
  }

  // ✅ Mettre à jour un test ride
  @Put(':id')
  async updateTestRide(@Param('id') id: string, @Body() updateTestRideDto: UpdateTestRideDto) {
    return await this.testRideService.updateTestRide(id, updateTestRideDto);
  }

  @Delete(':id')
  async deleteTestRide(@Param('id') id: string) {
    return await this.testRideService.deleteTestRide(id);
  }
}
