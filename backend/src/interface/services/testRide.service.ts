import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TestRide, TestRideDocument } from '../../infrastructure/database/schemas/testRide.schema';

@Injectable()
export class TestRideService {
  model: any;
  getTestRideById(id: string) {
    return this.model.findById(id);
  }
  constructor(@InjectModel(TestRide.name) private testRideModel: Model<TestRideDocument>) {}

  // ✅ Récupérer tous les test rides
  async getAllTestRides(): Promise<TestRide[]> {
    return this.testRideModel.find().exec();
  }

  // ✅ Récupérer un test ride par ID
  async createTestRide(data: Partial<TestRide>): Promise<TestRide> {
    const testRide = new this.testRideModel(data);
    return testRide.save();
  }

  // ✅ Création d'un test ride
  async updateTestRide(id: string, data: Partial<TestRide>): Promise<TestRide | null> {
    return this.testRideModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // ✅ Mettre à jour un test ride
  async deleteTestRide(id: string): Promise<TestRide | null> {
    return this.testRideModel.findByIdAndDelete(id).exec();
  }
}