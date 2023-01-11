import { ConflictException, Injectable, Logger, NotFoundException, PreconditionFailedException } from '@nestjs/common';
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

  async findOne(name: string): Promise<Node> {
    if (!name) {
      throw new PreconditionFailedException('输入的参数有误');
    }
    return await this.nodesRepository.findOneBy({ name });
  }

  async create(updateNodeDto: UpdateNodeDto) {
    const node = await this.findOne(updateNodeDto.name);
    if (node) {
      throw new ConflictException('该名称对应的节点已存在');
    }
    return await this.nodesRepository.save(updateNodeDto);
  }

  async findAllWithPage(page: number, limit: number) {
    const pageList = await this.nodesRepository.find({
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

  async update(name: string, updateNodeDto: UpdateNodeDto) {
    const node = await this.findOne(name);
    node.caption = updateNodeDto.caption;
    node.type = updateNodeDto.type;
    node.options = updateNodeDto.options;
    return await this.nodesRepository.save(node);
  }

  async remove(name: string) {
    const node = await this.findOne(name);
    if (!node) {
      throw new NotFoundException('没有找到要删除的用仿真工程');
    }
    await this.nodesRepository.remove(node);
    return undefined;
  }
}
