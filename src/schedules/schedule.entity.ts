import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Device } from './device.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    length: 30,
  })
  policyId: string;
  @Column()
  start: Date;
  @Column()
  end: Date;
  @Column()
  period: number; //millisec.
  @OneToMany(() => Device, (device) => device.schedule, {
    cascade: true,
  })
  devices: Device[];
  @Column()
  created: Date;
  @Column()
  updated: Date;
}
