// post.dto.ts

import { IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class UpdateContactDto {
  @IsString()
  @IsOptional()
  name!: string;

  @IsString()
  @IsOptional()
  phoneNumber!: string;

  @IsString()
  @IsOptional()
  email!: string;

  @IsString()
  @IsOptional()
  address!: string;

  @IsString()
  @IsOptional()
  workspaceId!: string;
}