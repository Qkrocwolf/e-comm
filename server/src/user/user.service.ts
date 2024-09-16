import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { MailService } from './mail.service';
import { TokenDto } from 'src/token/dto/token.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly tokenService: TokenService,
    private readonly mailService: MailService,
  ) {}

  async findUser(email: string): Promise<User> {
    return await this.userModel.findOne({
      where: { email: email },
    });
  }
  async createUser(
    user: UserDto,
  ): Promise<TokenDto & Omit<UserDto, 'password'>> {
    const userExist = await this.findUser(user.email);
    if (userExist) {
      throw new ConflictException('User already exist');
    }
    const passwordHash = await bcrypt.hash(user.password, 4);
    const { role, isActivated, email } = await this.userModel.create({
      email: user.email,
      password: passwordHash,
    });
    const tokens = await this.tokenService.generateToken(user.email);
    // await this.mailService.sendMail(email, activationLink);
    await this.tokenService.saveRefreshToken(user.email, tokens.refreshToken);
    return { role, isActivated, email, ...tokens };
  }
  async login(
    email: string,
    password: string,
  ): Promise<TokenDto & Omit<UserDto, 'password'>> {
    const user = await this.findUser(email);
    if (!user) {
      throw new HttpException(
        'incorrect login/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw new HttpException(
        'incorrect login/password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const tokens = await this.tokenService.generateToken(email);
    await this.tokenService.saveRefreshToken(email, tokens.refreshToken);
    return {
      email: user.email,
      isActivated: user.isActivated,
      role: user.role,
      ...tokens,
    };
  }
  async activate(link: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { activationLink: link },
    });
    if (!user) {
      throw new NotFoundException('Некорректная ссылка активации');
    }
    user.isActivated = true;
    return user.save();
  }
}
