import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Param,
  Get,
  UseGuards,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from 'src/token/token.service';
import { Request, Response } from 'express';
import { TokenDto } from 'src/token/dto/token.dto';
import { refreshGuard } from 'src/token/guards/refresh';
import { ConfigService } from '@nestjs/config';
import { cookieConfig } from 'src/configs/cookie.config';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private readonly config: ConfigService,
  ) {}

  @UsePipes(new ValidationPipe())
  @Post('registration')
  async registration(
    @Body() user: UserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto & Omit<UserDto, 'password'>> {
    const userData = await this.userService.createUser(user);
    res.cookie(
      'rfKey',
      userData.refreshToken,
      cookieConfig(this.config.get('JWT_REFRESH_LIFETIME').slice(0, -1)),
    );
    delete userData.refreshToken;
    return userData;
  }

  @UseGuards(AuthGuard('local'))
  @HttpCode(200)
  @Post('login')
  async login(
    @Body() user: UserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<TokenDto & Omit<UserDto, 'password'>> {
    const userData = await this.userService.login(user.email, user.password);
    res.cookie(
      'rfKey',
      userData.refreshToken,
      cookieConfig(this.config.get('JWT_REFRESH_LIFETIME').slice(0, -1)),
    );
    return userData;
  }

  @Get('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { rfKey: refreshToken } = req.cookies;
    res.clearCookie('rfKey', { path: '/' });
    await this.tokenService.deleteRefreshToken(refreshToken);
  }

  @Get('/activate/:link')
  async activate(@Param('link') link: string): Promise<string> {
    await this.userService.activate(link);
    return 'активация прошла успешно'; //сделать редирект
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('checkAuth')
  async profile(@Req() req: Request) {
    if ('email' in req.user) {
      const { email, role, isActivated } = await this.userService.findUser(
        req.user.email as string,
      );
      return { email, role, isActivated };
    }
  }

  @UseGuards(refreshGuard)
  @Get('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const email = await this.tokenService.findUserFromRefresh(
      req.cookies.rfKey,
    );
    const tokenUsed = await this.tokenService.labelRefreshToken(
      req.cookies.rfKey,
    );
    if (tokenUsed) {
      res.clearCookie(req.cookies.rfKey);
      return;
    }
    const token = await this.tokenService.generateToken(email);
    await this.tokenService.saveRefreshToken(email, token.refreshToken);
    res.cookie(
      'rfKey',
      token.refreshToken,
      cookieConfig(this.config.get('JWT_REFRESH_LIFETIME').slice(0, -1)),
    );
    return {
      accessToken: token.accessToken,
    };
  }
}
