// post.dto.ts

import { IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
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

  @IsString()
  @IsOptional()
  userId!: string;
}