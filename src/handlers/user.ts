import * as express from "express";

import { User, UserStore } from "../models/user";

const store = new UserStore();

const index = async (req: express.Request, res: express.Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: express.Request, res: express.Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: express.Request, res: express.Response) => {
  console.log("Entered create");
  const newUser: User = {
    id: 0,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
  };
  const user = await store.create(newUser);
  res.json(user);
};

const auth = async (req: express.Request, res: express.Response) => {
  const user = await store.authanticate(
    req.body.first_name,
    req.body.last_name,
    req.body.password
  );
  res.json(user);
};

const user_routes = (app: express.Application) => {
  app.get("/users", index);
  app.get("/users/:id", show);
  app.post("/users", create);
  app.post("/authanticate", auth);
};

export default user_routes;
