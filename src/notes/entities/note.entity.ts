import { Column, Entity, PrimaryColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'notes' })
export class Note {
  @PrimaryColumn()
  public id: string;

  @Column()
  public title: string;

  @Column()
  public body: string;

  @Column({ type: String, name: 'user_id' })
  public author: User['id'];

  @Column({ name: 'created_at' })
  public createdAt: Date;

  @Column({ name: 'updated_at' })
  public updatedAt: Date;

  constructor(
    id: string,
    title: string,
    body: string,
    author: User['id'],
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
