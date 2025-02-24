import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ScooterDocument = Scooter & Document;

@Schema()
export class Scooter {
  @Prop({ required: true })
  id!: string;

  @Prop({ required: true })
  model!: string;

  @Prop({ required: true })
  batteryCycles!: number;

  @Prop({ required: true })
  lastMaintenanceDate!: Date;
}

export const ScooterSchema = SchemaFactory.createForClass(Scooter);
