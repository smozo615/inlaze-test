import { Exclude, Expose } from 'class-transformer';
import { Model, Column, Table } from 'sequelize-typescript';

@Exclude()
@Table({
  tableName: 'users',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class User extends Model {
  @Expose()
  @Column({ autoIncrement: true, primaryKey: true, unique: true })
  id: number;

  @Expose()
  @Column
  username: string;

  @Expose()
  @Column({ field: 'full_name' })
  fullName: string;

  @Expose()
  @Column
  email: string;

  @Column
  password: string;
}
