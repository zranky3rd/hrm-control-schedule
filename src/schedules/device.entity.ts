import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from './schedule.entity';

@Entity('hrm-control-device')
export class Device {
  constructor(partial?: Partial<Device>) {
    Object.assign(this, partial);
  }
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  @Index()
  di: string;
  @Column({ length: 50, nullable: true })
  uid: string;
  @ManyToOne(() => Schedule, (schedule) => schedule.devices, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'scheduleId' })
  schedule: Schedule;
  @Column({ nullable: true })
  @Index()
  scheduleId: number;
}
