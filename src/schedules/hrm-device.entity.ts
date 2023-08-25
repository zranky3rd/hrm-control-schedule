import { Column, Entity, Index } from 'typeorm';

// @Entity('tb_device')
export class HrmDevice {
  @Column({ length: 50 })
  n: string;
  @Column({ length: 50 })
  icv: string;
  @Column({ length: 50 })
  dmv: string;
  @Column({ primary: true, length: 50 })
  di: string;
  @Column({ length: 50 })
  pi: string;
  @Column({ length: 50 })
  mnmn: string;
  @Column({ length: 50 })
  mnml: string;
  @Column({ length: 500 })
  mnmo: string;
  @Column({ length: 50 })
  mndt: string;
  @Column({ length: 50 })
  mnpv: string;
  @Column({ length: 50 })
  mnos: string;
  @Column({ length: 50 })
  mnhw: string;
  @Column({ length: 50 })
  mnfv: string;
  @Column({ length: 50 })
  mnsl: string;
  @Column({ length: 50 })
  st: string;
  @Column({ length: 50 })
  vid: string;
  @Column({ length: 5000 })
  data: string;
  @Column({ length: 50 })
  @Index()
  uid: string;
  @Column()
  joindatetime: Date;
  @Column()
  ctime: Date;
  @Column({ length: 50 })
  mnmo_mn: string;
  @Column({ length: 50 })
  mnmo_serial: string;
  @Column({ length: 100 })
  mnmo_info: string;
  @Column({ length: 10 })
  @Index()
  mnmo_info_dt: string;
  @Column({ length: 2 })
  ezone_link: string;
  @Column({ length: 2 })
  isvirtual: string;
  @Column({ length: 10 })
  plantcode: string;
  @Column({ length: 45 })
  @Index()
  modelcode: string;
  @Column({ length: 60 })
  imid: string;
  @Column({ length: 20 })
  projectname: string;
  @Column({ length: 4 })
  prd_year: string;
  @Column({ length: 2 })
  prd_month: string;
  @Column({ length: 5000 })
  disabledCapabilitiesList: string;
  @Column({ length: 10000 })
  capabilitiesList: string;
  @Column({ length: 50 })
  locationId: string;
  @Column()
  last_easysetup_date: Date;
}
