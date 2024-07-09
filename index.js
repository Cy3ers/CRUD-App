const express = require("express");
const app = express();
const { userRoutes, prodRoutes } = require("./routes");
const { logger, jsonParser } = require("./middleware");
const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 8080;

app.use(express.json());

// Middleware
app.use(logger);
app.use(jsonParser);

app.get("/", (req, res) => {
  res.send("Hello User! Welcome to Express Server!");
});

app.use("/users", userRoutes);
app.use("/products", prodRoutes);

app.listen(port, () => console.log(`Listening on port ${port}...`));
