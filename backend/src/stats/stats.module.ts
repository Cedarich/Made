import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsSchema}  from './stats.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Stats', schema: StatsSchema }])
  ],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService]
})
export class StatsModule {} 