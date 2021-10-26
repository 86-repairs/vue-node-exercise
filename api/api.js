const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const Equipment = require("./equipmentData");
const fs = require('fs')

const app = express();

app.use(cors());
app.use(bodyParser.json())
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

app.post("/search", (req, res) => {
    const vendor = req.body.vendor 
    const resString = Equipment.filter((equip) => equip.manufacturer == vendor)

    if (!vendor || !resString) {
      res.status(500).json({ error: "Incorrect search parameters, or search returned nothing." });
    } else {
      res.status(200).json(resString);
    }
});

app.post("/submit-ticket", (req, res) => {
    var matchFound = Equipment.some((sn) => sn.serial_number == req.body.equipmentSerial)

    if(matchFound)
    {
      try {
        let fileData = fs.readFileSync('C:\\Users\\justi\\Documents\\Tickets.txt').toString();
        if(fileData.length < 1)
        {
          fileData = "[]"
        }
        let tickets = JSON.parse(fileData);
        tickets.push(req.body)
        const data = fs.writeFileSync('C:\\Users\\justi\\Documents\\Tickets.txt', JSON.stringify(tickets));
        res.status(200).json({ Message: "Ticket Submitted!" });
      } catch (err) {
        res.status(500).json({ error: err });
      }
    } else {
      res.status(500).json({ error: "Serial Number not found" });
    }
});

const port = 8100;

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
