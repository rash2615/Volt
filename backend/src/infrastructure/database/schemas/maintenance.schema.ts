import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MaintenanceDocument = Maintenance & Document;
// Maintenance entity
@Schema()
export class Maintenance {
  @Prop({ required: true })
  scooterId!: string;

  @Prop({ required: true })
  scheduledDate!: Date;

  @Prop({ required: true })
  description!: string; 

  @Prop({ default: false })
  completed!: boolean;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
