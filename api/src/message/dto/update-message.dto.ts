import { PartialType } from '@nestjs/mapped-types';
import { CreateMessageDto } from './create-message.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMessageDto extends PartialType(CreateMessageDto) {
  @ApiProperty({ example: 'NouveauPseudo' })
  sender?: string;

  @ApiProperty({ example: 'Nouveau contenu du message' })
  content?: string;
}
