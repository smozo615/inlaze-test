import { IsString, IsNotEmpty, IsDate, IsInt } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty({ format: Date() })
  @IsDate()
  @IsNotEmpty()
  readonly date: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  readonly userId: number;
}

export class CreateMessageDto extends PickType(MessageDto, [
  'content',
] as const) {}
