import { Model, Column, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column({ unique: true })
  username: string;

  @Column({ field: 'full_name' })
  fullName: string;

  @Column
  email: string;

  @Column
  password: string;
}
