import * as bcrypt from 'bcrypt';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { IsEmail, MinLength, MaxLength } from 'class-validator';
import environmentConfig from '../../../config';
import { UserRole } from '../role.enum';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    nullable: true,
    default: null,
  })
  profile: string;

  @OneToMany(() => Post, (post) => post.user, { eager: true })
  // @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @BeforeInsert()
  async bcryptPassword() {
    const saltOrRounds = parseInt(environmentConfig.BCRYPT.SALT);
    const hash = await bcrypt.hash(this.password, saltOrRounds);
    this.password = hash;
  }
}
