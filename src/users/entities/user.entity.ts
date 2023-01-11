import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

export enum UserGender {
  Unknown = 0,
  Male = 1, // 男
  Female = 2, // 女
}

export enum RightRole {
  Normal = 1,
  Admin = 2,
}

@Entity()
export class User {
  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
    comment: '用户名',
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: '真实姓名',
  })
  realname: string;

  @Column({
    type: 'enum',
    enum: UserGender,
    nullable: false,
    default: UserGender.Unknown,
    comment: '性别',
  })
  gender: UserGender;

  @Exclude()
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'password',
    length: 128,
    comment: '密码',
  })
  password: string;

  @Exclude()
  @Column({
    type: 'enum',
    enum: RightRole,
    nullable: false,
    name: 'rightRole',
    default: RightRole.Normal,
    comment: '权限角色',
  })
  rightRole: RightRole;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'createTime',
    comment: '创建时间',
  })
  createTime: Date;

  @Column({ default: true })
  isActive: boolean;
}
