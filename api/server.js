const port = process.env.PORT || 3002;
const express = require("express");
var cors = require("cors");
const messageRouter = require("./controllers/messages_controller");
const userRouter = require("./controllers/users_controller");
const database = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

app.use(async function (req, res, next) {
  console.log("Time:", Date.now());
  console.log(req.body.token);
  const rows = await getToken(req.body.token);
  console.log(rows);
  if (!rows[0]) {
    console.log("empty string");
    res.status(401);
    res.json({ message: "unauthorized" });
  } else {
    next();
  }
});

async function getToken(token) {
  const row = await database.query("SELECT * FROM token WHERE token = ?", [
    token,
  ]);
  return row;
}

app.get("/", (req, res, next) => res.send(`Server is running on port ${port}`));

app.use("/message", messageRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
