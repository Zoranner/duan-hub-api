import { Injectable, Logger, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  async findOne(id: number) {
    if (!id) {
      throw new PreconditionFailedException('输入的参数有误');
    }
    return await this.projectsRepository.findOneBy({ id });
  }

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectsRepository.save(createProjectDto);
  }

  async findAllWithPage(page: number, limit: number) {
    const pageList = await this.projectsRepository.find({
      select: {
        id: true,
        caption: true,
        describe: true,
        goals: {},
        startTime: true,
        finishTime: true,
        createTime: true,
      },
      order: {
        createTime: 'DESC',
      },
      skip: limit * (page - 1),
      take: limit,
    });

    return { data: pageList, page: page, limit: limit, count: 0 };
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    project.caption = updateProjectDto.caption;
    project.describe = updateProjectDto.describe;
    project.goals = updateProjectDto.goals;
    project.nodes = updateProjectDto.nodes;
    project.roles = updateProjectDto.roles;
    return await this.projectsRepository.save(project);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    if (!project) {
      throw new NotFoundException('没有找到要删除的用仿真工程');
    }
    await this.projectsRepository.remove(project);
    return undefined;
  }
}
