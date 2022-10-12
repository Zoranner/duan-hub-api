import { PrimaryGeneratedColumn } from 'typeorm';

export class Node {
  @PrimaryGeneratedColumn()
  id: number;
}
