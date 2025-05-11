import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockMessageRepo = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  merge: jest.fn(),
  remove: jest.fn(),
});

const mockUserRepo = () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('MessageService', () => {
  let service: MessageService;
  let messageRepo: jest.Mocked<Repository<Message>>;
  let userRepo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        { provide: getRepositoryToken(Message), useFactory: mockMessageRepo },
        { provide: getRepositoryToken(User), useFactory: mockUserRepo },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    messageRepo = module.get(getRepositoryToken(Message));
    userRepo = module.get(getRepositoryToken(User));
  });

  it('should create a message with existing user', async () => {
    const dto = { content: 'Hello', sender: 'test' };
    const user = { id: 1, pseudo: 'test' };
    const message = { id: 1, content: 'Hello', sender: user };

    userRepo.findOne.mockResolvedValue(user as User);
    messageRepo.create.mockReturnValue(message as Message);
    messageRepo.save.mockResolvedValue(message as Message);

    const result = await service.create(dto);
    expect(result).toEqual(message);
    expect(userRepo.findOne).toHaveBeenCalledWith({
      where: { pseudo: 'test' },
    });
  });

  it('should throw if message not found in findOne', async () => {
    messageRepo.findOne.mockResolvedValue(null);

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });

  it('should return all messages in findAll', async () => {
    const messages = [{ id: 1, content: 'A' }];
    messageRepo.find.mockResolvedValue(messages as Message[]);

    const result = await service.findAll();
    expect(result).toEqual(messages);
    expect(messageRepo.find).toHaveBeenCalled();
  });

  it('should delete a message', async () => {
    const message = { id: 1, content: 'Bye' };
    messageRepo.findOne.mockResolvedValue(message as Message);
    messageRepo.remove.mockResolvedValue(message as Message);

    const result = await service.remove(1);
    expect(result).toEqual(message);
  });

  it('should update a message with new content and sender', async () => {
    const oldUser = { id: 1, pseudo: 'old' };
    const newUser = { id: 2, pseudo: 'new' };
    const existingMessage = { id: 1, content: 'old content', sender: oldUser };
    const updatedMessage = { id: 1, content: 'new content', sender: newUser };
    const dto = { content: 'new content', sender: 'new' };

    messageRepo.findOne.mockResolvedValue(existingMessage as Message);
    userRepo.findOne.mockResolvedValueOnce(null); // simulate new user
    userRepo.create.mockReturnValue(newUser as User);
    userRepo.save.mockResolvedValue(newUser as User);
    messageRepo.merge.mockReturnValue(updatedMessage as Message);
    messageRepo.save.mockResolvedValue(updatedMessage as Message);

    const result = await service.update(1, dto);
    expect(result).toEqual(updatedMessage);
    expect(userRepo.findOne).toHaveBeenCalledWith({ where: { pseudo: 'new' } });
    expect(messageRepo.merge).toHaveBeenCalledWith(existingMessage, {
      content: 'new content',
      sender: newUser,
    });
  });
});
