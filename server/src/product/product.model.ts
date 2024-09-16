import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({ timestamps: false })
export class Product extends Model {
  @Column
  title: string;
  @Column({
    type: DataType.FLOAT(2),
  })
  price: number;
  @Column({
    type: DataType.TEXT('long'),
  })
  description: string;
  @Column
  category: string;
  @Column
  image: string;
}
