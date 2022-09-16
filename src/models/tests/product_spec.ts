import { Product, ProductStore } from "../product";
import { User } from "../user";
const supertest = require("supertest");
import app from "../../server";
const store = new ProductStore();
const request = supertest(app);

let token;

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("create method should add a product", async () => {
    const result = await store.create({
      name: "test product",
      price: 23,
      id: 0,
    });
    expect(result).toEqual({
      name: "test product",
      price: 23,
      id: 1,
    });
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        name: "test product",
        price: 23,
        id: 1,
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      name: "test product",
      price: 23,
      id: 1,
    });
  });
});

describe("Product Endpoint", () => {
  beforeAll(async () => {
    const testUser: User = {
      id: 0,
      first_name: "zeyad",
      last_name: "tarek",
      password: "1234",
    };

    const requestData = JSON.stringify(testUser);
    const response = await request.post("/users", requestData);
    token = response.body;
  });

  it("Test the index endpoint", async () => {
    const response = await request.get("/products");
    expect(response.body).toEqual([{ id: 1, name: "test product", price: 23 }]);
  });

  it("Test the show endpoint", async () => {
    const response = await request.get("/products/1");
    expect(response.body).toEqual({ id: 1, name: "test product", price: 23 });
  });

  it("Test the create endpoint", async () => {
    const requestData = {
      name: "test product",
      price: 21,
    };
    const response = await request
      .post("/products")
      .set("Authorization", `Bearer ${token}`)
      .send(requestData);
    expect(response.body).toEqual({ id: 2, name: "test product", price: 21 });
  });
});
