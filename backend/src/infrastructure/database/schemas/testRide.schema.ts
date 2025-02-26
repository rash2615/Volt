import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class TestRide {
  @Prop({ required: true })
  scooterId!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  date!: Date;

  @Prop({ required: true, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' })
  status!: string;
}

export type TestRideDocument = TestRide & Document;
export const TestRideSchema = SchemaFactory.createForClass(TestRide);