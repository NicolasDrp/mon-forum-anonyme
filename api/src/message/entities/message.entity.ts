import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Message {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  sender: User;

  @ApiProperty({ example: 'Voici un message.' })
  @Column()
  content: string;

  @ApiProperty({ example: new Date().toISOString() })
  @CreateDateColumn()
  date: Date;
}
