import { Controller, Get, Post, Body, UseGuards, Query, Logger } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dto/create-node.dto';
import { UpdateNodeDto } from './dto/update-node.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidateLimitPipe, ValidatePagePipe } from 'src/utils/pipe/list.pipe';

@Controller('nodes')
export class NodesController {
  private readonly logger = new Logger(NodesController.name);

  constructor(private readonly nodesService: NodesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createNodeDto: CreateNodeDto) {
    return this.nodesService.create(createNodeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  findAllWithPage(@Query('page', ValidatePagePipe) page: number, @Query('limit', ValidateLimitPipe) limit: number) {
    return this.nodesService.findAllWithPage(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail')
  findOne(@Query('name') name: string) {
    return this.nodesService.findOne(name);
  }

  @UseGuards(JwtAuthGuard)
  @Post('detail')
  update(@Query('name') name: string, @Body() updateNodeDto: UpdateNodeDto) {
    return this.nodesService.update(name, updateNodeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove')
  remove(@Query('name') name: string) {
    return this.nodesService.remove(name);
  }
}
