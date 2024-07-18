import supertest from "supertest";
import web from "../src/app/web.js";
import { destroy as deleteCategory } from "../utils/categorytest.js";

describe("POST /api/categories", () => {
  afterEach(async () => {
    await deleteCategory();
  });
  it("should create data category", async () => {
    const result = await supertest(web)
      .post("/api/categories")
      .set("Authorization", "2f15569c-9dcc-4766-a65c-f3c517488a67")
      .send({
        name: "vegetables",
      });

    expect(result.status).toBe(201);
    expect(result.body.data.name).toBe("vegetables");
  });

  it("should not create data category because category name already exist", async () => {
    const result = await supertest(web)
      .post("/api/categories")
      .set("Authorization", "2f15569c-9dcc-4766-a65c-f3c517488a67")
      .send({
        name: "Fruit",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should can't create data category because user is not admin", async () => {
    const result = await supertest(web)
      .post("/api/categories")
      .set("Authorization", "9586c9b6-aefd-4ca8-9b6d-4d6d114962d1")
      .send({
        name: "vegetables",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
