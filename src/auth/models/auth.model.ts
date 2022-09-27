import { ApiProperty } from "@nestjs/swagger";
import { idExample } from "../constants";

export class AuthModel {
  @ApiProperty(idExample)
  _id: string;
  @ApiProperty({example: 'example@mail.com', description: 'User email'})
  email: string;
  @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6InZiYzAyQGlsLnJ1IiwiX2lkIjoiNjMyNGI0OWUzZjc5NjkwNmVhZTEzYWZm' +
      'IiwiaWF0IjoxNjYzNDA3MzIwLCJleHAiOjE2NjM0MTA5MjB9.9blgNP07KNoI_NN9oNWW0-' +
      'AdYzl6OKA7qyyXqIBkteU', description: 'JWT token'})
  token: string;
}
