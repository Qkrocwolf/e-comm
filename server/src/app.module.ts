import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { getSequelConfig } from './configs/sequel.config';
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { getMailerConfig } from './configs/mailer.config';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMailerConfig,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getSequelConfig,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TokenModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
