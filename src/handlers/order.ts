import * as express from "express";

import { Order, OrderStore } from "../models/order";

const jwt = require("jsonwebtoken");
const store = new OrderStore();

const verifyAuthToken = (req: express.Request, res: express.Response, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET);

    next();
  } catch (err) {
    res.status(401);
    res.json(`Invalid Token `);
  }
};

const showAll = async (req: express.Request, res: express.Response) => {
  const orders = await store.allUserOrders(req.params.id);
  res.json(orders);
};
const showCompleted = async (req: express.Request, res: express.Response) => {
  const orders = await store.completedUserOrders(req.params.id);
  res.json(orders);
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders/:id", verifyAuthToken, showAll);
  app.get("/completedorders/:id", verifyAuthToken, showCompleted);
};

export default orderRoutes;
