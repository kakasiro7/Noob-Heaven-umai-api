import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  userName: string;

  @IsNotEmpty()
  @IsInt()
  userId: string;

  @IsNotEmpty()
  @IsString()
  userPassword: string;
}
