import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Token } from './token.model';
import { TokenDto } from './dto/token.dto';
@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token) private readonly tokenModel: typeof Token,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async generateToken(email: string): Promise<TokenDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          email: email,
        },
        {
          secret: this.config.get('JWT_ACCESS_SECRET'),
          expiresIn: this.config.get('JWT_ACCESS_LIFETIME'),
        },
      ),
      this.jwtService.signAsync(
        {
          email: email,
        },
        {
          secret: this.config.get('JWT_REFRESH_SECRET'),
          expiresIn: this.config.get('JWT_REFRESH_LIFETIME'),
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
  async deleteRefreshToken(token: string): Promise<void> {
    const refreshToken = await this.tokenModel.findOne({
      where: { refreshToken: token },
    });
    if (refreshToken) {
      refreshToken.destroy();
    }
  }

  async findUserFromRefresh(token: string): Promise<string> {
    const { email } = await this.tokenModel.findOne({
      where: { refreshToken: token },
    });
    return email;
  }

  async saveRefreshToken(email: string, refreshToken: string): Promise<void> {
    const token = await this.tokenModel.create({
      email: email,
      refreshToken: refreshToken,
    });
    token.expireAt = new Date(
      Date.now() +
        24 *
          60 *
          60 *
          1000 *
          this.config.get('JWT_REFRESH_LIFETIME').slice(0, -1),
    );
    token.save();
  }

  async labelRefreshToken(token: string): Promise<void | number> {
    const refreshToken = await this.tokenModel.findOne({
      where: {
        refreshToken: token,
      },
    });
    if (refreshToken.used === true) {
      const email = await this.findUserFromRefresh(token);
      return await this.tokenModel.destroy({
        where: { email: email },
      });
    }
    refreshToken.used = true;
    refreshToken.save();
  }

  async validateRefresh(refreshToken: string): Promise<boolean> {
    try {
      const user = await this.tokenModel.findOne({
        where: { refreshToken: refreshToken },
      });
      const tokenCheck = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
      });
      if (user && tokenCheck) {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
