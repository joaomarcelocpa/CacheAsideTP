import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class StudentUpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
