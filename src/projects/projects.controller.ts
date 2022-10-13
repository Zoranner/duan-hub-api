import { Controller, Get, Post, Body, Patch, Param, Delete, Logger, Query, ForbiddenException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(private readonly projectsService: ProjectsService) {}

  @Get('hello')
  helloProject() {
    return this.projectsService.hello();
  }

  @Post('create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get('list')
  findAll() {
    return this.projectsService.findAll();
  }

  @Get('detail')
  findOne(@Query('id') id: number) {
    return this.projectsService.findOne(id);
  }

  @Patch('update')
  update(@Query('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
