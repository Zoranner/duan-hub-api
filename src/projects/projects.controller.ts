import { Controller, Get, Post, Body, Logger, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ValidateLimitPipe, ValidatePagePipe } from 'src/utils/pipe/list.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  private readonly logger = new Logger(ProjectsController.name);

  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  findAllWithPage(@Query('page', ValidatePagePipe) page: number, @Query('limit', ValidateLimitPipe) limit: number) {
    return this.projectsService.findAllWithPage(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail')
  findOne(@Query('id') id: number) {
    return this.projectsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('detail')
  update(@Query('id') id: number, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove')
  remove(@Query('id') id: number) {
    return this.projectsService.remove(id);
  }
}
