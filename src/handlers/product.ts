import * as express from "express";

import { Product, ProductStore } from "../models/product";

const jwt = require("jsonwebtoken");
const store = new ProductStore();

const verifyAuthToken = (req: express.Request, res: express.Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  } catch (err) {
    res.status(401);
    res.json(`Invalid Token ${err}`);
  }
};

const index = async (req: express.Request, res: express.Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: express.Request, res: express.Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: express.Request, res: express.Response) => {
  const product: Product = {
    id: 0,
    name: req.body.name,
    price: req.body.price,
  };

  try {
    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {}
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
  app.post("/products", verifyAuthToken, create);
};

export default product_routes;
