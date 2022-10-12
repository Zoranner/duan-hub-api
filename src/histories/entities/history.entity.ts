import { PrimaryGeneratedColumn } from 'typeorm';

export class History {
  @PrimaryGeneratedColumn()
  id: number;
}
