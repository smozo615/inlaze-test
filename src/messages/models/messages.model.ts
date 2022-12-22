import { Exclude, Expose } from 'class-transformer';
import {
  Model,
  Column,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { User } from '../../users/models/users.model';

@Exclude()
@Table({
  tableName: 'messages',
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class Message extends Model {
  @Expose()
  @Column({ autoIncrement: true, primaryKey: true, unique: true })
  id: number;

  @Expose()
  @Column
  content: string;

  @Expose()
  @Column
  date: Date;

  @ForeignKey(() => User)
  @Column({ field: 'user_id' })
  userId: string;

  @Expose()
  @BelongsTo(() => User)
  user: User;
}
