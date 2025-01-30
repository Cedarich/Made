import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats } from './stats.schema';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel('Stats') private readonly statsModel: Model<Stats>
  ) {}

  async getStats() {
    const stats = await this.statsModel.findOne().sort({ updatedAt: -1 });
    
    if (!stats) {
      const defaultStats = new this.statsModel({
        tvl: 2450000,
        wallets: 126500,
        rewards: 892400
      });
      await defaultStats.save();
      return defaultStats;
    }

    return stats;
  }

  async updateStats(newStats: {
    tvl: number;
    wallets: number;
    rewards: number;
  }) {
    const stats = new this.statsModel(newStats);
    await stats.save();
    return stats;
  }
}