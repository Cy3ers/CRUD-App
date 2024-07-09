const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const prodDataPath = path.join(__dirname, "../data/products.json");

const readData = () => {
  const data = fs.readFileSync(prodDataPath, "utf8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(prodDataPath, JSON.stringify(data, null, 2), "utf8");
};

router.get("/", (req, res) => {
  const data = readData();
  res.status(200).send(data.products);
});

router.get("/:id", (req, res) => {
  const data = readData();
  const product = data.products.find((c) => c.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("The product with the given ID was not found.");
  res.status(200).send(product);
});

router.post("/", (req, res) => {
  const data = readData();
  const newProduct = {
    id: data.products.length + 1,
    name: req.body.name,
    available: req.body.available
  };
  data.products.push(newProduct);
  writeData(data);
  res.status(201).send(newProduct);
});

router.put("/:id", (req, res) => {
  const data = readData();
  const product = data.products.find((c) => c.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("The product with the given ID was not found.");

  product.name = req.body.name;
  product.available = req.body.available;

  writeData(data);
  res.status(200).send(product);
});

router.patch("/:id", (req, res) => {
  const data = readData();
  const product = data.products.find((c) => c.id === parseInt(req.params.id));
  if (!product) return res.status(404).send("The product with the given ID was not found.");

  if (req.body.name) {
    product.name = req.body.name;
  }
  if (req.body.available !== undefined) {
    product.available = req.body.available;
  }

  writeData(data);
  res.status(200).send(product);
});

router.delete("/:id", (req, res) => {
  const data = readData();
  const prodIndex = data.products.findIndex((c) => c.id === parseInt(req.params.id));
  if (prodIndex === -1) return res.status(404).send("The product with the given ID was not found.");

  const deletedProd = data.products.splice(prodIndex, 1);
  writeData(data);

  res.status(200).send(deletedProd);
});

module.exports = router;
