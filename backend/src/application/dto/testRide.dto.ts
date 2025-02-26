import { IsString, IsOptional, IsDate } from 'class-validator';

// DTOs for TestRide entity
export class CreateTestRideDto {
  @IsString()
  scooterId!: string;
  
  @IsString()
  userId!: string;

  @IsDate()
  startTime!: Date;
}

export class UpdateTestRideDto {
  @IsOptional()
  @IsString()
  scooterId?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsDate()
  startTime?: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date;
}
