import { Injectable } from '@nestjs/common';
import { ScooterEntity } from '../../domain/entities/scooter.entity';
import { CheckScooterStatusUseCase } from '../../application/use-cases/check-scooter-status.usecase';
import { v4 as uuidv4 } from 'uuid';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ScooterDocument } from '../../infrastructure/database/schemas/scooter.schema';

@Injectable()
export class ScooterService {
  constructor(
    @InjectModel('Scooter') private scooterModel: Model<ScooterDocument>
  ) {}

  // Retourner la liste des scooters depuis MongoDB
  async getAllScooters(): Promise<ScooterEntity[]> {
    const scooters = await this.scooterModel.find().exec();
    return scooters.map(
      (scooter) =>
        new ScooterEntity(
          scooter.id,
          scooter.model,
          scooter.batteryCycles,
          scooter.lastMaintenanceDate
        )
    );
  }

  // Vérifier le statut d'un scooter spécifique
  async checkStatus(id: string): Promise<string> {
    const scooter = await this.scooterModel.findById(id).exec();
    if (!scooter) {
      return 'Scooter introuvable';
    }

    const entity = new ScooterEntity(
      scooter.id,
      scooter.model,
      scooter.batteryCycles,
      scooter.lastMaintenanceDate
    );

    const useCase = new CheckScooterStatusUseCase();
    return useCase.execute(entity);
  }

  // Créer un nouveau scooter dans la base MongoDB
  async createScooter(model: string, batteryCycles: number, lastMaintenanceDate: Date): Promise<ScooterEntity> {
    const scooter = new this.scooterModel({
      id: uuidv4(),
      model,
      batteryCycles,
      lastMaintenanceDate,
    });
    await scooter.save();

    return new ScooterEntity(
      scooter.id,
      scooter.model,
      scooter.batteryCycles,
      scooter.lastMaintenanceDate
    );
  }
}
