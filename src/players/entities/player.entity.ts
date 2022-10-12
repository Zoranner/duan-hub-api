import { PrimaryGeneratedColumn } from 'typeorm';

export class Player {
  @PrimaryGeneratedColumn()
  id: number;
}
