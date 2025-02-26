import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestRide, TestRideDocument } from '../../infrastructure/database/schemas/testRide.schema';

@Injectable()
export class TestRideService {
  constructor(@InjectModel(TestRide.name) private testRideModel: Model<TestRideDocument>) {}

  async getAllTestRides(): Promise<TestRide[]> {
    return this.testRideModel.find().exec();
  }

  async createTestRide(data: Partial<TestRide>): Promise<TestRide> {
    const testRide = new this.testRideModel(data);
    return testRide.save();
  }

  async updateTestRide(id: string, data: Partial<TestRide>): Promise<TestRide | null> {
    return this.testRideModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteTestRide(id: string): Promise<TestRide | null> {
    return this.testRideModel.findByIdAndDelete(id).exec();
  }
}