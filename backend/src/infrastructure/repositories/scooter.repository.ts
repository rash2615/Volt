import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Scooter, ScooterDocument } from '../database/schemas/scooter.schema'; // Schéma Mongoose
import { ScooterEntity } from '../../domain/entities/scooter.entity'; // Entité métier

@Injectable()
export class ScooterRepository {
  constructor(
    @InjectModel(Scooter.name) private scooterModel: Model<ScooterDocument>
  ) {}

  // Créer un scooter en base de données
  async createScooter(scooterData: ScooterEntity): Promise<ScooterEntity> {
    const newScooter = new this.scooterModel(scooterData);
    await newScooter.save();

    return new ScooterEntity(
      newScooter.id,
      newScooter.model,
      newScooter.batteryCycles,
      newScooter.lastMaintenanceDate
    );
  }

  // Retourner tous les scooters
  async findAll(): Promise<ScooterEntity[]> {
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
}
