import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestRideDocument = TestRide & Document;

@Schema()
export class TestRide {
  @Prop({ required: true })
  scooterId!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true, default: Date.now })
  startTime!: Date;

  @Prop()
  endTime!: Date;
}

export const TestRideSchema = SchemaFactory.createForClass(TestRide);
