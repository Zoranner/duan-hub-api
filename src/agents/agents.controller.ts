import { Controller, Get, Post, Body, UseGuards, Query, Logger } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { CreateAgentDto } from './dto/create-agent.dto';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidateLimitPipe, ValidatePagePipe } from 'src/utils/pipe/list.pipe';

@Controller('agents')
export class AgentsController {
  private readonly logger = new Logger(AgentsController.name);

  constructor(private readonly agentsService: AgentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createAgentDto: CreateAgentDto) {
    return this.agentsService.create(createAgentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  findAllWithPage(@Query('page', ValidatePagePipe) page: number, @Query('limit', ValidateLimitPipe) limit: number) {
    return this.agentsService.findAllWithPage(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail')
  findOne(@Query('name') name: string) {
    return this.agentsService.findOneWithChilden(name);
  }

  @UseGuards(JwtAuthGuard)
  @Post('detail')
  update(@Query('name') name: string, @Body() updateAgentDto: UpdateAgentDto) {
    return this.agentsService.update(name, updateAgentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove')
  remove(@Query('name') name: string) {
    return this.agentsService.remove(name);
  }
}
