// post.dto.ts

import { IsString, IsOptional, IsArray, IsNotEmpty} from 'class-validator';

export class AddGroupContactDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  contactIds!: string[];
}