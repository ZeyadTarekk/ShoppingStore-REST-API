import * as express from "express";

import { Product, ProductStore } from "../models/product";

const store = new ProductStore();

const index = async (req: express.Request, res: express.Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: express.Request, res: express.Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const product_routes = (app: express.Application) => {
  app.get("/products", index);
  app.get("/products/:id", show);
};

export default product_routes;
