import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Message } from './entities/message.entity';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Le message a été créé avec succès',
    type: Message,
  })
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Liste des messages',
    type: [Message],
  })
  findAll() {
    return this.messageService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Détails du message',
    type: Message,
  })
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Le message a été mis à jour avec succès',
    type: Message,
  })
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Le message a été supprimé avec succès',
    type: Message,
  })
  remove(@Param('id') id: string) {
    return this.messageService.remove(+id);
  }
}
