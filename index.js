var express = require("express");
var app = express();
require("./Schema/index");
var routes = require("./Routes/index");

const PORT = 8080; // we can use dotenv to get this from the environment

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
