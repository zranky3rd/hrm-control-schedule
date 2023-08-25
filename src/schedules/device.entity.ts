import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  di: string;
  @Column({ length: 50 })
  uid: string;
  @ManyToOne(() => Schedule, (schedule) => schedule.devices, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  schedule: Schedule;
  @Column()
  scheduleId: number;
}
