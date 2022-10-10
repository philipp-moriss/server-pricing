import { HttpStatus, INestApplication, ValidationPipe } from "@nestjs/common";
import { disconnect, Types } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import * as request from "supertest";
import { CreateAuthDto } from "../src/auth/dto/create-auth.dto";
import { UserModel } from "../src/user/user.model";
import { AppModule } from "../src/app.module";
import { MongoExceptionFilter, ValidationExceptionFilter } from "../src/exeptionsFilters/exeption-filter";
import { RequestUserDto } from "../src/auth/dto/request-auth.dto";

const registerDto: CreateAuthDto = {
  email: "last1test@test.test",
  password: "test_password",
  firstName: "First Name",
  lastName: "Last Name"
};

const shortRegisterDto: CreateAuthDto = {
  email: "last2test@test.test",
  password: "test_password",
  firstName: "First Name",
  lastName: "Last Name"
};

const loginDto: RequestUserDto = {
  email: registerDto.email,
  password: registerDto.password
};

const shortLoginDto: RequestUserDto = {
  email: shortRegisterDto.email,
  password: shortRegisterDto.password
};

describe("auth test", () => {
  let app: INestApplication;
  let userFromDB: UserModel;
  let token: string;
  let shortToken: string;
  let userId: Types.ObjectId;
  let shortUserId: Types.ObjectId;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new ValidationExceptionFilter(), new MongoExceptionFilter());
    await app.init();
  });

  it("/auth/register (POST) - success", async function() {
    return request(app.getHttpServer())
      .post("/auth/register")
      .send(registerDto)
      .then(({ body }: request.Response) => {
        expect(body.token).toBeDefined();
        expect(body.email).toBe(registerDto.email);
        expect(body._id).toBeDefined();
        userId = body._id;
      });
  });

  it("/auth/login (POST) - success", async function() {
    return request(app.getHttpServer())
      .post("/auth/login")
      .send(loginDto)
      .then(({ body }: request.Response) => {
        expect(body._id).toBe(userId);
        expect(body.token).toBeDefined();
        token = body.token;
      });
  });

  it("/users/user (GET) - success", async function() {
    return request(app.getHttpServer())
      .get("/users/user")
      .set("Authorization", `Bearer ${token}`)
      .then(({ body }: request.Response) => {
        expect(body.email).toBe(registerDto.email);
        expect(body.firstName).toBe(registerDto.firstName);
        expect(body.lastName).toBe(registerDto.lastName);
        expect(body._id).toBe(userId);
        userFromDB = body;
      });
  });

  it("/users/user (GET) - failed (token expired)", async function() {
    await request(app.getHttpServer())
      .post("/auth/register")
      .send(shortRegisterDto);

    const { body: { token, _id } } = await request(app.getHttpServer())
      .post("/auth/test-short-login")
      .send(shortLoginDto);

    shortUserId = _id;

    return request(app.getHttpServer())
      .get("/users/user")
      .set("Authorization", `Bearer ${token}`)
      .expect(HttpStatus.FORBIDDEN)
      .then(({ body }: request.Response) => {
        expect(body.statusCode).toBe(HttpStatus.FORBIDDEN);
        expect(body.message).toBe("jwt expired");
      });
  });

  it("/users/user (GET) - failed (no token)", async function() {
    return request(app.getHttpServer())
      .get("/users/user")
      .expect(HttpStatus.UNAUTHORIZED)
      .then(({ body }: request.Response) => {
        expect(body.statusCode).toBe(HttpStatus.UNAUTHORIZED);
        expect(body.message).toBe("You are not authorized");
      });
  });

  it("/users/delete-test/:id (DELETE) clean-up the user", async () => {
    await request(app.getHttpServer())
      .delete(`/users/delete-test/${userId}`)
      .then(({ body }: request.Response) => {
        expect(body.id).toBe(userId);
      });
    return request(app.getHttpServer())
      .delete(`/users/delete-test/${shortUserId}`)
      .then(({ body }: request.Response) => {
        expect(body.id).toBe(shortUserId);
      });
  });

  afterAll(() => {
    disconnect();
  });
});