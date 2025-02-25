import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockItemDocument = StockItem & Document;

@Schema()
export class StockItem {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  quantity!: number;

  @Prop({ required: true })
  lastRestocked!: Date;
}

export const StockItemSchema = SchemaFactory.createForClass(StockItem);
