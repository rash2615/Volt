import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Scooter, ScooterDocument } from '../../infrastructure/database/schemas/scooter.schema';

@Injectable()
export class ScooterService {
  constructor(
    @InjectModel(Scooter.name) private scooterModel: Model<ScooterDocument>
  ) {}

  async getAllScooters(): Promise<Scooter[]> {
    return this.scooterModel.find().exec();
  }

  async checkStatus(id: string): Promise<string> {
    const scooter = await this.scooterModel.findById(id).exec();
    if (!scooter) {
      return 'Scooter introuvable';
    }

    const now = new Date();
    const sixMonths = 1000 * 60 * 60 * 24 * 30 * 6;
    const needsMaintenance = scooter.batteryCycles >= 50 || (now.getTime() - new Date(scooter.lastMaintenanceDate).getTime()) > sixMonths;

    return needsMaintenance ? 'Nécessite une maintenance' : 'En bon état';
  }

  async createScooter(model: string, batteryCycles: number, lastMaintenanceDate: Date): Promise<Scooter> {
    const scooter = new this.scooterModel({
      id: uuidv4(),
      model,
      batteryCycles,
      lastMaintenanceDate
    });
    return scooter.save();
  }

  async deleteScooter(id: string): Promise<string> {
    const result = await this.scooterModel.findOneAndDelete({ id });
    if (!result) {
      throw new Error('Scooter introuvable');
    }
    return 'Scooter supprimé avec succès';
  }

  async updateScooter(id: string, updateData: { model?: string; batteryCycles?: number; lastMaintenanceDate?: Date }) {
    const updatedScooter = await this.scooterModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedScooter) {
      throw new Error('Scooter introuvable');
    }
    return updatedScooter;
  }
}
