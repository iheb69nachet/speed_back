import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Agent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;


}
