// post.dto.ts

import { IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsOptional()
  userId!: string;
}