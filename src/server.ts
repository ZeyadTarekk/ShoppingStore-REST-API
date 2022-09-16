import * as express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
import product_routes from "./handlers/product";
import user_routes from "./handlers/user";
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req: express.Request, res: express.Response) {
  res.send("Hello World!");
});

product_routes(app);
user_routes(app);
app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
