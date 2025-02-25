import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Maintenance, MaintenanceDocument } from '../../infrastructure/database/schemas/maintenance.schema';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectModel(Maintenance.name) private maintenanceModel: Model<MaintenanceDocument>,
  ) {}

  // ✅ Planifier une maintenance
  async scheduleMaintenance(
    scooterId: string,
    scheduledDate: Date,
    description: string
  ): Promise<string> {
    try {
      const maintenance = new this.maintenanceModel({
        scooterId,
        scheduledDate,
        description, // ✅ On l'enregistre bien ici
        completed: false
      });
      await maintenance.save();
      return '✅ Maintenance planifiée avec succès.';
    } catch (error) {
      console.error('❌ Erreur lors de la planification de la maintenance:', error);
      throw new Error('Erreur interne lors de la planification de la maintenance.');
    }
  }
  
  
  // ✅ Récupérer toutes les maintenances
  async getAllMaintenance(): Promise<Maintenance[]> {
    return this.maintenanceModel.find().exec();
  }

  // ✅ Terminer une maintenance
  async completeMaintenance(id: string): Promise<string> {
    const result = await this.maintenanceModel.findByIdAndUpdate(id, { completed: true }).exec();
    if (!result) {
      throw new Error('Maintenance non trouvée');
    }
    return 'Maintenance terminée avec succès';
  }
}
