import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsInt,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';

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

export class UpdateMessageDto extends PickType(MessageDto, [
  'content',
] as const) {}

enum order {
  Asc = 'ASC',
  Desc = 'DESC',
}

export class FilterDto {
  @ApiProperty()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsOptional()
  date?: string;

  @ApiProperty()
  @IsEnum(order)
  @IsOptional()
  messagesOrder?: order;
}

export class FilterCurrentUserMessagesDto extends OmitType(FilterDto, [
  'name',
] as const) {}
