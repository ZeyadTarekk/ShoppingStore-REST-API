import * as express from "express";

import { User, UserStore } from "../models/user";

const jwt = require("jsonwebtoken");

const store = new UserStore();

const verifyAuthToken = (req: express.Request, res: express.Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  } catch (err) {
    res.status(401);
    res.json(`Invalid Token`);
  }
};

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
  try {
    const user = await store.create(newUser);
    const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET);
    console.log(token);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err + newUser);
  }
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
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  app.post("/users", create);
  app.post("/authanticate", auth);
};

export default user_routes;
