import { ApiProperty } from "@nestjs/swagger";

export class AuthModel {
  @ApiProperty({example: '14246a564e1d6519db5a7e365', description: 'unique id'})
  _id: string;
  @ApiProperty({example: 'example@mail.com', description: 'User email'})
  email: string;
  @ApiProperty({example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' +
      'eyJlbWFpbCI6InZiYzAyQGlsLnJ1IiwiX2lkIjoiNjMyNGI0OWUzZjc5NjkwNmVhZTEzYWZm' +
      'IiwiaWF0IjoxNjYzNDA3MzIwLCJleHAiOjE2NjM0MTA5MjB9.9blgNP07KNoI_NN9oNWW0-' +
      'AdYzl6OKA7qyyXqIBkteU', description: 'JWT token'})
  token: string;
}
