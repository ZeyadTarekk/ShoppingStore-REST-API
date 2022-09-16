import * as express from "express";

import { User, UserStore } from "../models/user";

const store = new UserStore();

const index = async (req: express.Request, res: express.Response) => {
  const users = await store.index();
  res.json(users);
};
// const show = async (req: express.Request, res: express.Response) => {
//   const product = await store.show(req.params.id);
//   res.json(product);
// };

const create = async (req: express.Request, res: express.Response) => {
  console.log("Entered create");
  const newUser: User = {
    id: 0,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  console.log("new user", newUser);
  const user = await store.create(newUser);
  res.json(user);
};

const user_routes = (app: express.Application) => {
  app.get("/users", index);
  app.post("/users", create);
};

export default user_routes;
