// post.dto.ts

import { IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  email!: string;

  @IsString()
  @IsOptional()
  password!: string;

  @IsString()
  @IsOptional()
  workspaceId!: string;
}