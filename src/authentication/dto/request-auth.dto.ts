import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { mailExample, passExample } from "../constants";

export class RequestUserDto {
  @ApiProperty(mailExample)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty(passExample)
  @IsNotEmpty()
  password: string;
}
