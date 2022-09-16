import { Order, OrderStore } from "../order";
import { User } from "../user";
const supertest = require("supertest");
import app from "../../server";
const store = new OrderStore();
const request = supertest(app);

let token;

describe("Order Model", () => {
  it("should have allUserOrders method", () => {
    expect(store.allUserOrders).toBeDefined();
  });

  it("should have a completedUserOrders method", () => {
    expect(store.completedUserOrders).toBeDefined();
  });

  it("index method should return a list of orders", async () => {
    const result = await store.allUserOrders("1");
    expect(result).toEqual([]);
  });

  it("index method should return a list of orders", async () => {
    const result = await store.completedUserOrders("1");
    expect(result).toEqual([]);
  });
});

describe("Order Endpoint", () => {
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

  it("Test the all orders endpoint", async () => {
    const response = await request
      .get("/orders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).toEqual([]);
  });

  it("Test the completed orders endpoint", async () => {
    const response = await request
      .get("/completedorders/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body).toEqual([]);
  });
});
