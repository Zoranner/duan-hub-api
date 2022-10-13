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

  hello() {
    const project: Project = new Project();
    project.name = '第三次世界大战太空军博弈对抗';
    project.red = new CampScript();
    project.red.detail =
      '第三次世界大战，为继第二次世界大战后未来可能爆发的下一次世界大战，是目前仅处于幻想中而尚未爆发的假想战争。但常见于政治论题、大众文化、民众之间茶余饭后的聊天内容里。该术语至少早在1941年就开始使用，有些角度将其宽其术语应用于有限的或更轻微的国际冲突，例如冷战或反恐战争。相比之下，其他角度则假想战争从破坏性影响上都将超过以前的世界大战。';
    project.blue = new CampScript();
    project.blue.detail =
      '第三次世界大战，为继第二次世界大战后未来可能爆发的下一次世界大战，是目前仅处于幻想中而尚未爆发的假想战争。但常见于政治论题、大众文化、民众之间茶余饭后的聊天内容里。该术语至少早在1941年就开始使用，有些角度将其宽其术语应用于有限的或更轻微的国际冲突，例如冷战或反恐战争。相比之下，其他角度则假想战争从破坏性影响上都将超过以前的世界大战。';
    return this.projectsRepository.save(project);
  }

  create(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.save(createProjectDto);
  }

  findAll() {
    return `This action returns all projects`;
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
