import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FindUsersDto {
  @ApiProperty({
    required: false,
    description: 'Search query for users',
    type: String,
  })
  @IsOptional()
  @IsString()
  query?: string;

  @ApiProperty({ required: false, description: 'User email', type: String })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    required: false,
    description: 'User phone number',
    type: String,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
