import { Product, ProductStore } from "../product";
import { User, UserStore } from "../user";
const supertest = require("supertest");
import app from "../../server";
import Client from "../../database";
const store = new ProductStore();
const request = supertest(app);

let token;

describe("Book Model", () => {
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

  it("index method should return a list of books", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        name: "test product",
        price: 23,
        id: 1,
      },
    ]);
  });

  it("show method should return the correct book", async () => {
    const result = await store.show("1");
    expect(result).toEqual({
      name: "test product",
      price: 23,
      id: 1,
    });
  });
});
