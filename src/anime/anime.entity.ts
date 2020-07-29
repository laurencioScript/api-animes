import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Anime extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'genre', type: 'simple-array' })
  genre: string[];

  @Column({ name: 'type', type: 'varchar' })
  type: string;

  @Column({ name: 'episodes', type: 'varchar' })
  episodes: string;

  @Column({ name: 'rating', type: 'numeric' })
  rating: number;

  @Column({ name: 'members', type: 'varchar' })
  members: string;

  @Column({ name: 'origin', type: 'boolean', default: false })
  origin: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
