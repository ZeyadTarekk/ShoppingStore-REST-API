import { User, UserStore } from "../user";
const supertest = require("supertest");
import app from "../../server";
const store = new UserStore();
const request = supertest(app);

let token;

describe("User Model", () => {
  beforeAll(async () => {
    const requestData = {
      first_name: "zeyad",
      last_name: "tarek",
      password: "1234",
    };
    const response = await request.post("/users", JSON.stringify(requestData));
    // console.log(response);
    token = response.body;
    console.log(token);
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

  it("index method should return a list of users", async () => {
    const result = await store.index();
    // console.log(result);
    expect(result).toHaveSize(3);
  });

  it("create method should add a user", async () => {
    const result = await store.create({
      first_name: "ahmed",
      last_name: "mohamed",
      password: "1234",
      id: 0,
    });
    expect(result.first_name).toEqual("ahmed");
  });

  it("show method should return the correct user", async () => {
    const result = await store.show("4");
    expect(result.first_name).toEqual("ahmed");
  });
});

describe("User Endpoint", () => {
  it("Test the index endpoint", async () => {
    const response = await request
      .get("/users")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).toHaveSize(4);
  });
  it("Test the show endpoint", async () => {
    const response = await request
      .get("/users/4")
      .set("Authorization", `Bearer ${token}`);
    // console.log(response.body);
    expect(response.body.first_name).toEqual("ahmed");
  });
  it("Test the create endpoint", async () => {
    const requestData = {
      first_name: "abdallah",
      last_name: "ahmed",
      password: "1234",
    };
    const response = await request.post("/users").send(requestData);
    expect(response.status).toEqual(200);
  });
});
