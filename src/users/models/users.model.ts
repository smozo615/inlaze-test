import { Model, Column, Table } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
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
