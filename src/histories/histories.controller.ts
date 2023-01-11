import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { HistoriesService } from './histories.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidateLimitPipe, ValidatePagePipe } from 'src/utils/pipe/list.pipe';

@Controller('histories')
export class HistoriesController {
  constructor(private readonly historiesService: HistoriesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historiesService.create(createHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  findAllWithPage(@Query('page', ValidatePagePipe) page: number, @Query('limit', ValidateLimitPipe) limit: number) {
    return this.historiesService.findAllWithPage(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('detail')
  findOne(@Query('id') id: number) {
    return this.historiesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('detail')
  update(@Query('id') id: number, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historiesService.update(id, updateHistoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('waiting')
  findWaiting() {
    return this.historiesService.findWaiting();
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove')
  remove(@Query('id') id: number) {
    return this.historiesService.remove(id);
  }
}
