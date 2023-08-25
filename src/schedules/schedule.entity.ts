import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Device } from './device.entity';

@Entity('hrm-control-schedule')
export class Schedule {
  constructor(partial?: Partial<Schedule>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 30,
  })
  policyId: string;
  @Column()
  @Index()
  startAt: Date;
  @Column()
  @Index()
  endAt: Date;
  @Column()
  period: number; //millisec.
  @OneToMany(() => Device, (device) => device.schedule, {
    cascade: true,
  })
  // @Exclude()
  devices: Device[];
  @CreateDateColumn()
  @Index()
  createdAt: Date;
  @Exclude()
  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;
}
