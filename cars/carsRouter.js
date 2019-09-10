const express = require("express");

const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve car" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve car" });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then(ids => {
      db("cars")
        .where({ id: ids[0] })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      console.log("POST error", err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

router.delete("/", (req, res) => {
  const id = req.params.id;
  db("cars")
    .where({ id: id })
    .del()
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.json(500);
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  const id = req.params.id;
  db("cars")
    .where({ id: id })
    .update(changes)
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => {
      res.json(500);
    });
});

module.exports = router;
