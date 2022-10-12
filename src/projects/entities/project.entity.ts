import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface Condition {
  target: string;
  action: number;
  timeLimit: number;
}

interface Goal {
  type: number;
  condition: Condition;
}

interface Option {
  name: string;
  current: any;
}

interface Node {
  id: number;
  sceneId: string;
  name: string;
  options: Option[];
}

interface Role {
  id: number;
  name: string;
  control: string[];
}

class CampScript {
  detail: string;
  goals: Goal[];
  nodes: Node[];
  roles: Role[];
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'json',
  })
  red: CampScript;

  @Column({
    type: 'json',
  })
  blue: CampScript;
}

export { CampScript };
