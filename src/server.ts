import * as express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req: express.Request, res: express.Response) {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
