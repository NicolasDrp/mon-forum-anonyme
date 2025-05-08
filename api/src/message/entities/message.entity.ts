import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Pseudo' })
  @Column()
  sender: string;

  @ApiProperty({ example: 'Voici un message.' })
  @Column()
  content: string;

  @ApiProperty({ example: new Date().toISOString() })
  @CreateDateColumn()
  date: Date;
}
