import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly fullName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ format: 'password' })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class LoginDto extends PickType(SignupDto, [
  'username',
  'password',
] as const) {}
