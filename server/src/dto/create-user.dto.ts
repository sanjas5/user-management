import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number of the user' })
  @IsString()
  phoneNumber: string;
}
