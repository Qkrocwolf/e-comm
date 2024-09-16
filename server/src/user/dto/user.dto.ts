import { IsEmail, MinLength } from 'class-validator';

export class UserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  isActivated: boolean;

  role: 'user' | 'moderator' | 'administrator';
}
