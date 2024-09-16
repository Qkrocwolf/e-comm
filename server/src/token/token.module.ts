import { Module } from '@nestjs/common';
import { Token } from './token.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './passport/jwt.strategy';
import { refreshGuard } from './guards/refresh';

@Module({
  imports: [
    SequelizeModule.forFeature([Token]),
    ConfigModule,
    JwtModule.register({}),
  ],
  providers: [TokenService, JwtStrategy, ConfigService, refreshGuard],
  exports: [TokenService],
})
export class TokenModule {}
