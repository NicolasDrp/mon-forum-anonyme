import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from './message/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'mfa',
      entities: [Message, User],
      synchronize: true,
    }),
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
