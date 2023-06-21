import { ConflictException, Injectable, Logger, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAgentDto } from './dto/update-agent.dto';
import { Agent } from './entities/agent.entity';

@Injectable()
export class AgentsService {
  private readonly logger = new Logger(AgentsService.name);

  constructor(
    @InjectRepository(Agent)
    private readonly agentsRepository: Repository<Agent>,
  ) {}

  async findOne(name: string): Promise<Agent> {
    if (!name) {
      throw new PreconditionFailedException('输入的参数有误');
    }
    return await this.agentsRepository.findOneBy({ name });
  }

  async create(updateAgentDto: UpdateAgentDto) {
    const agent = await this.findOne(updateAgentDto.name);
    if (agent) {
      throw new ConflictException('该名称对应的智能体已存在');
    }
    return await this.agentsRepository.save(updateAgentDto);
  }

  async findAllWithPage(page: number, limit: number) {
    const pageList = await this.agentsRepository.find({
      select: {
        name: true,
        caption: true,
        type: true,
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

  async update(name: string, updateAgentDto: UpdateAgentDto) {
    const agent = await this.findOne(name);
    agent.caption = updateAgentDto.caption;
    agent.type = updateAgentDto.type;
    agent.options = updateAgentDto.options;
    return await this.agentsRepository.save(agent);
  }

  async remove(name: string) {
    const agent = await this.findOne(name);
    if (!agent) {
      throw new NotFoundException('没有找到要删除的用仿真工程');
    }
    await this.agentsRepository.remove(agent);
    return undefined;
  }
}
