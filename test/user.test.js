import {
  create as createUser,
  destroy as deleteUser,
} from "../utils/usertest.js";
import supertest from "supertest";
import web from "../src/app/web.js";

describe("POST /api/users", () => {
  afterEach(async () => {
    await deleteUser();
  });
  it("should register user", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "test",
      name: "test",
      gender: "Male",
      role: "Admin",
      password: "password",
    });

    expect(result.status).toBe(201);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.gender).toBe("Male");
    expect(result.body.data.role).toBe("Admin");
    expect(result.body.data.password).not.toBe("password");
  });

  it("should reject user register", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: " ",
      name: " ",
      gender: "Male",
      role: "Admin",
      password: "password",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should user already exist", async () => {
    const result = await supertest(web).post("/api/users").send({
      username: "admin",
      name: "admin",
      gender: "Male",
      role: "Admin",
      password: "password",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await createUser();
  });
  afterEach(async () => {
    await deleteUser();
  });

  it("should can login user", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "test",
      password: "password",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
  });

  it("should reject login user because username empty", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: " ",
      password: "password",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject login user because user not found", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "testlagi",
      password: "password",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject login user because password invalid", async () => {
    const result = await supertest(web).post("/api/users/login").send({
      username: "testlagi",
      password: "passwordsalah",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('LOGOUT "/api/:userId/logout"', () => {
  it("should logout user ", async () => {
    const result = await supertest(web).post("/api/1/logout");

    expect(result.status).toBe(200);
  });

  it("should not logout user because user not found", async () => {
    const result = await supertest(web).post("/api/5/logout");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});
