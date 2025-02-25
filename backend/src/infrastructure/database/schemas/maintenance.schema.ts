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
  description!: string; // ✅ Champ obligatoire

  @Prop({ default: false })
  completed!: boolean;
}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
