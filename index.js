const express = require("express");
const app = express();
const userRoutes = require("./routes/users.js");
const prodRoutes = require("./routes/products.js");
const logger = require("./middleware/logger-middleware.js");
const jsonParser = require("./middleware/parse-middleware.js");

app.use(express.json());

// Middleware
app.use(logger);
app.use(jsonParser);

app.get("/", (req, res) => {
  res.send("Hello User! Welcome to Express Server!");
});

app.use("/users", userRoutes);
app.use("/products", prodRoutes);

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
