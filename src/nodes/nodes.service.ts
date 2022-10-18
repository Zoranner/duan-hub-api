import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateNodeDto } from './dto/update-node.dto';
import { Node } from './entities/node.entity';

@Injectable()
export class NodesService {
  private readonly logger = new Logger(NodesService.name);

  constructor(
    @InjectRepository(Node)
    private readonly nodesRepository: Repository<Node>,
  ) {}

  create(updateNodeDto: UpdateNodeDto) {
    return this.nodesRepository.save(updateNodeDto);
  }

  async findAllWithPage(page: number, limit: number) {
    const pageList = await this.nodesRepository.find({
      select: {
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

  async findOne(name: string): Promise<Node> {
    return await this.nodesRepository.findOneBy({ name });
  }

  async update(name: string, updateNodeDto: UpdateNodeDto) {
    const project = await this.findOne(name);
    project.name = updateNodeDto.name;
    return await this.nodesRepository.save(project);
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
