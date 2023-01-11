import { Injectable, Logger, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { Repository } from 'typeorm';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History, HistoryState } from './entities/history.entity';

@Injectable()
export class HistoriesService {
  private readonly logger = new Logger(HistoriesService.name);

  constructor(
    @InjectRepository(History)
    private readonly historiesRepository: Repository<History>,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async findOne(id: number) {
    if (!id) {
      throw new PreconditionFailedException('输入的参数有误');
    }
    return await this.historiesRepository.findOne({
      where: {
        id: id,
      },
      select: {
        id: true,
        caption: true,
        state: true,
        project: {
          id: true,
          caption: true,
          describe: true,
          goals: {
            red: true,
            blue: true,
          },
          nodes: {
            red: true,
            blue: true,
          },
          roles: {
            red: true,
            blue: true,
          },
          startTime: true,
          finishTime: true,
          createTime: true,
        },
        createTime: true,
      },
      relations: {
        project: true,
      },
    });
  }

  async create(createHistoryDto: CreateHistoryDto) {
    this.logger.debug(JSON.stringify(createHistoryDto));
    const project = await this.projectsRepository.findOneBy({ id: createHistoryDto.projectId });
    if (!project) {
      throw new NotFoundException('没有找到要引用的用仿真工程');
    }
    const history = new History();
    history.caption = createHistoryDto.caption;
    history.state = createHistoryDto.state;
    history.project = project;
    return await this.historiesRepository.save(history);
  }

  async findAllWithPage(page: number, limit: number) {
    const pageList = await this.historiesRepository.find({
      select: {
        id: true,
        caption: true,
        state: true,
        project: {
          id: true,
          caption: true,
          describe: true,
          goals: {
            red: true,
            blue: true,
          },
          startTime: true,
          finishTime: true,
          createTime: true,
        },
        createTime: true,
      },
      relations: {
        project: true,
      },
      order: {
        createTime: 'DESC',
      },
      skip: limit * (page - 1),
      take: limit,
    });

    return { data: pageList, page: page, limit: limit, count: 0 };
  }

  async update(id: number, updateHistoryDto: UpdateHistoryDto) {
    const history = await this.findOne(id);
    history.caption = updateHistoryDto.caption;
    history.state = updateHistoryDto.state;
    return await this.historiesRepository.save(history);
  }

  async findWaiting() {
    const history = await this.historiesRepository.findOne({
      select: {
        id: true,
        caption: true,
        state: true,
        project: {
          id: true,
          caption: true,
          describe: true,
          goals: {
            red: true,
            blue: true,
          },
          nodes: {
            red: true,
            blue: true,
          },
          roles: {
            red: true,
            blue: true,
          },
          startTime: true,
          finishTime: true,
          createTime: true,
        },
        createTime: true,
      },
      where: {
        state: HistoryState.Waiting,
      },
      relations: {
        project: true,
      },
      order: {
        createTime: 'DESC',
      },
    });
    if (!history) {
      throw new NotFoundException('当前没有正在准备中的仿真训练');
    }
    return history;
  }

  async remove(id: number) {
    const history = await this.findOne(id);
    if (!history) {
      throw new NotFoundException('没有找到要删除的历史仿真');
    }
    await this.historiesRepository.remove(history);
    return undefined;
  }
}
