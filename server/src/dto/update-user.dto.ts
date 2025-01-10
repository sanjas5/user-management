import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'First name of the user', required: false })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({ description: 'Last name of the user', required: false })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({ description: 'Email of the user', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Phone number of the user', required: false })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
