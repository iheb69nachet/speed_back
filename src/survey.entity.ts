import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export enum SurveyStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export enum ContactType {
  MADAME = 'MADAME',
  MONSIEUR = 'MONSIEUR',
}

@Entity()
export class Survey {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  contact_type: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  address: string;

  @Column()
  postal_code: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column()
  meal_wine_preference: string;

  @Column()
  purchase_purpose: string;

  @Column()
  wine_region_preference: string;

  @Column()
  purchase_location: string;

  @Column()
  purchaser: string;

  @Column({ type: 'integer', nullable: true })
  birth_year: number;

  @Column()
  employment_status: string;

  @Column()
  spouse_status: string;

  @Column({ type: 'text', nullable: true, default: '' })
  comment: string;

  @Column({ default: 'active' })
  status: string;

  @Column()
  agent: string;

  @CreateDateColumn()
  created_at: Date;
}