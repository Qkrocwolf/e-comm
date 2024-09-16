import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserController } from './user.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { LocalStrategy } from './passport/local.strategy';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [SequelizeModule.forFeature([User]), MailerModule, TokenModule],
  providers: [UserService, MailService, LocalStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
