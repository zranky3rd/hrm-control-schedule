import { IsArray, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateScheduleDto {
  @IsString()
  policyId: string;
  @IsDateString()
  startAt: Date;
  @IsDateString()
  endAt: Date;
  @IsNumber()
  period: number;
  @IsArray()
  deviceIds: string[];
}
