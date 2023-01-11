import { Module } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { HistoriesController } from './histories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';
import { Project } from 'src/projects/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History, Project])],
  controllers: [HistoriesController],
  providers: [HistoriesService],
  exports: [HistoriesService],
})
export class HistoriesModule {}
