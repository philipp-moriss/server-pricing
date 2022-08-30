import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
