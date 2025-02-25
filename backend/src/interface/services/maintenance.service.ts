import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Maintenance, MaintenanceDocument } from '../../infrastructure/database/schemas/maintenance.schema';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectModel(Maintenance.name) private maintenanceModel: Model<MaintenanceDocument>
  ) {}

  async scheduleMaintenance(
    scooterId: string,
    scheduledDate: Date,
    notes: string
  ): Promise<Maintenance> {
    const newMaintenance = new this.maintenanceModel({ scooterId, scheduledDate, notes });
    return newMaintenance.save();
  }

  async getAllMaintenances(): Promise<Maintenance[]> {
    return this.maintenanceModel.find().exec();
  }

  async completeMaintenance(id: string): Promise<Maintenance | null> {
    return this.maintenanceModel.findByIdAndUpdate(id, { status: 'completed' }, { new: true }).exec();
  }
}
