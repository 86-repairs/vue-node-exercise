const cors = require("cors");
const express = require("express");
const Equipment = require("./equipmentData");

const app = express();

app.use(cors());
app.options("*", cors());

app.get("/equipment", (req, res) => {
  setTimeout(() => {
    const randomNum = Math.floor(Math.random() * 10) + 1;

    if (randomNum > 7) {
      res.status(500).json({ error: "Ah jeez!" });
    } else {
      res.json(Equipment);
    }
  }, 800);
});

app.get("/equipment/search", (req, res) => {
  const manufacturer = req.query.manufacturer?.toLowerCase() ?? "";
  
  const filteredEquipment = Equipment.filter(
    e => e.manufacturer?.toLowerCase().indexOf(manufacturer) > -1
  );

  res.json(filteredEquipment);
});

const port = 8100;

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
