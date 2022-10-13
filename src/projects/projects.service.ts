import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CampScript, Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) {}

  create(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.save(createProjectDto);
  }

  async findAllWithPage(page: number, limit: number) {
    const pageList = await this.projectsRepository.find({
      select: {
        id: true,
        name: true,
        createTime: true,
      },
      order: {
        createTime: 'DESC',
      },
      skip: limit * (page - 1),
      take: limit,
    });

    return { data: pageList, page: page, limit: limit };
  }

  async findOne(id: number) {
    return await this.projectsRepository.findOneBy({ id });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.findOne(id);
    project.name = updateProjectDto.name;
    project.red = updateProjectDto.red;
    project.blue = updateProjectDto.blue;
    return await this.projectsRepository.save(project);
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
