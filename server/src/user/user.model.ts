import {
  Column,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Token } from 'src/token/token.model';
import { v4 as uuidv4 } from 'uuid';

@Table({ timestamps: false })
export class User extends Model {
  @PrimaryKey
  @Column
  email: string;

  @Column
  password: string;

  @Default('user')
  @Column
  role: 'user' | 'moderator' | 'administrator';

  @Column
  name: string;

  @Column
  surname: string;

  @Column
  country: string;

  @Column
  city: string;

  @Column
  gender: 'male' | 'female';

  @Column
  birthday: Date;

  @Default(false)
  @Column
  isActivated: boolean;

  @Default(uuidv4)
  @Column
  activationLink: string;

  @HasMany(() => Token)
  refreshTokens: Token[];
}
