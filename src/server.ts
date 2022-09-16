import * as express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
import productRoutes from "./handlers/product";
import userRoutes from "./handlers/user";
import orderRoutes from "./handlers/order";
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req: express.Request, res: express.Response) {
  res.send("Hello World!");
});

productRoutes(app);
userRoutes(app);
orderRoutes(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
