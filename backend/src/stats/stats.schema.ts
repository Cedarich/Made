import { model, Schema } from 'mongoose';

export interface Stats extends Document {
  tvl: number;
  wallets: number;
  rewards: number;
  updatedAt: Date;
}

export const StatsSchema = new Schema<Stats>({
  tvl: { type: Number, required: true },
  wallets: { type: Number, required: true },
  rewards: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default model<Stats>('Stats', StatsSchema);