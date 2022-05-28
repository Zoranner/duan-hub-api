import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

export enum UserGender {
  Male = 1, // 男
  Female = 2, // 女
}

export enum UserRole {
  Normal = 1,
  Admin = 2,
  SuperAdmin = 3,
}

@Entity()
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  realname: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    default: UserGender.Male,
  })
  gender: UserGender;

  @Exclude()
  @Column({
    type: 'varchar',
    nullable: false,
    length: 128,
    comment: '密码',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Normal,
  })
  adminRole: UserRole;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'signDate',
    comment: '创建时间',
  })
  signDate: Date;

  @Exclude()
  @Column({ default: true })
  isActive: boolean;
}
