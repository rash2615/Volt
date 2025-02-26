// src/infrastructure/database/schemas/stock.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StockItemDocument = StockItem & Document;
// StockItem entity
@Schema()
export class StockItem {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, default: 0 })
  quantity!: number;

  @Prop({ required: true, default: 5 })
  threshold!: number;

  @Prop({ required: true })
  lastRestocked!: Date;
}

export const StockItemSchema = SchemaFactory.createForClass(StockItem);
