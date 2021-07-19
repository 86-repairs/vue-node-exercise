const cors = require("cors");
const express = require("express");
const Equipment = require("./equipmentData");
const DBClient = require("../db/db-client");
const bodyParser = require('body-parser')

const app = express();

app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

DBClient.getPoolConnectionToDB();

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

app.get("/equipment/query", (req, res) => {

  let manufacturer = req.query.manufacturer;

  let filteredEquipment = Equipment.filter(item => item.manufacturer === manufacturer);

  res.json(filteredEquipment);
  res.status(200).end();

});

app.post("/ticket", async (req, res) => {

  let equipmentSerial = req.body.equipmentSerial;
  if(Equipment.filter(item => item.serial_number === equipmentSerial).length > 0){
    await DBClient.executeInsert(`INSERT INTO tickets (problem, equipment_serial) VALUES ('${req.body.problem}', '${req.body.equipmentSerial}')`);
    res.status(201).end();
  }
  else{
    let errorString = "Sorry, that serial number doesn't exist in our records";
    console.log(errorString);
    res.status(404).json({ error: errorString }).end();
  }
});

const port = 8100;

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
