import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ example: 'Pseudo' })
  sender: string;

  @ApiProperty({ example: 'Ceci est un message' })
  content: string;
}
