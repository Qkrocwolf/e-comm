import {
  Column,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table({ timestamps: false })
export class Token extends Model {
  @Column
  refreshToken: string;

  @ForeignKey(() => User)
  @Column
  email: string;

  @Default(false)
  @Column
  used: boolean;

  @Column
  expireAt: Date;
}
