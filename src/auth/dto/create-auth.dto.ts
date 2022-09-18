import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
  @ApiProperty({ example: "example@mail.com", description: "User email" })
  readonly email: string;
  @ApiProperty({ example: "Any pass", description: "Any pass" })
  readonly password: string;
  @ApiProperty({ example: "Jack", description: "User first name" })
  readonly firstName: string;
  @ApiProperty({ example: "Sparrow", description: "User last name" })
  readonly lastName: string;
}
