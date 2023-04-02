const express = require("express");
const app = express();

const port = process.env.port || 8080;
app.liste(port, () => console.log("service listening on port " + port));
