import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
