import { ApiProperty } from "@nestjs/swagger";
import { mailExample, passExample } from "../constants";

export class CreateAuthDto {
  @ApiProperty(mailExample)
  readonly email: string;
  @ApiProperty(passExample)
  readonly password: string;
  @ApiProperty({ example: "Jack", description: "User first name", required: false })
  readonly firstName: string;
  @ApiProperty({ example: "Sparrow", description: "User last name", required: false })
  readonly lastName: string;
}
