import { IsArray, IsDateString, IsNumber } from 'class-validator';

export class CreateScheduleDto {
  policyId: string;
  @IsDateString()
  start: Date;
  @IsDateString()
  end: Date;
  @IsNumber()
  period: number;
  @IsArray()
  devices: string[];
}
