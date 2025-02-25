import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MaintenanceDocument = Maintenance & Document;

@Schema()
export class Maintenance {
  @Prop({ required: true })
  scooterId!: string;

  @Prop({ required: true })
  scheduledDate!: Date;

  @Prop({ required: true })
  notes!: string;

  @Prop({ default: 'pending' })
  status!: string;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
