import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    let user = await this.userRepository.findOne({
      where: { pseudo: createMessageDto.sender },
    });

    if (!user) {
      user = this.userRepository.create({
        pseudo: createMessageDto.sender,
      });
      user = await this.userRepository.save(user);
    }

    const message = this.messageRepository.create({
      content: createMessageDto.content,
      sender: user,
    });

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

    // Si un nouveau sender est fourni, on le récupère ou on le crée
    let user: User | undefined =
      (await this.userRepository.findOne({
        where: { pseudo: updateMessageDto.sender },
      })) ?? undefined;

    if (!user) {
      user = this.userRepository.create({
        pseudo: updateMessageDto.sender,
      });
      user = await this.userRepository.save(user);
    }

    const updated = this.messageRepository.merge(message, {
      content: updateMessageDto.content,
      ...(user && { sender: user }), // on ne met sender que si présent
    });

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
