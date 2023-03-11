import express from "express";
import bodyParser from "body-parser";
import rotateRoute from "./routes/rotate";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/rotate", rotateRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
