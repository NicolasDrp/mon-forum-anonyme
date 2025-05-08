import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messageRepository.create(createMessageDto);
    return this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return this.messageRepository.find({
      order: {
        date: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    return message;
  }

  async update(
    id: number,
    updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    const updated = this.messageRepository.merge(message, updateMessageDto);
    return this.messageRepository.save(updated);
  }

  async remove(id: number): Promise<Message> {
    const message = await this.findOne(id);
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    return this.messageRepository.remove(message);
  }
}
