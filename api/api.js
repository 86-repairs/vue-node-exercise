const cors = require("cors");
const express = require("express");
// const Equipment = require("./equipmentData"); // commenting out now that we are using the database.  Can be removed with the commented out section below
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.options("*", cors());

// establish a database connection
const sqlite3 = require("sqlite3").verbose();
const db_name = path.join(__dirname, "86repairs.db");
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database '86repairs.db'");
});

/**
 * Submit a ticket
 */
app.post("/tickets", (req, res) => {
  const sql = "SELECT SerialNumber FROM Equipment WHERE SerialNumber = ?";
  const serialNumber = req.body.equipmentSerial.trim();

  db.get(sql, serialNumber, (err, row) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (row.SerialNumber === serialNumber) {
      if (err) {
        return res.status(500).json({ error: "Invalid Serial Number" });
      }
    }
    // @TODO: We should really have a foreign key to equipment, but we'll stick with the instructions for now
    const sql = "INSERT INTO Tickets (EquipmentSerial, Problem) VALUES (?, ?)";
    const ticket = [req.body.equipmentSerial.trim(), req.body.problem.trim()];
    db.run(sql, ticket, (err) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
    });

    return res.json({ status: 201, message: "Successfully Saved" });
  });
});

app.get("/tickets", (req, res) => {
  const tickets = [];
  const sql = "SELECT * FROM Tickets ORDER BY ID";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    for (const row of rows) {
      const val = {
        id: row.ID,
        equipmentSerial: row.EquipmentSerial,
        problem: row.Problem,
      };
      tickets.push(val);
    }
    res.json(tickets);
  });
});

/**
 * Delete a ticket
 */
app.delete("/ticket/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Ticket WHERE ID = ?";
  db.run(sql, id, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json({});
  });
});

/**
 * Search for equipment using the hardcoded js object
 */
// app.get("/equipment/search", (req, res) => {
//   const { value, querytype } = req.query;
//   let filteredEquipment = [];
//   const valueClean = value.toLowerCase();
//   const typeClean = querytype.toLowerCase();
//   switch (typeClean) {
//     case "manufacturer":
//       filteredEquipment = Equipment.filter(
//         (e) =>
//           e.manufacturer &&
//           e.manufacturer.toLowerCase().indexOf(valueClean) > -1
//       );
//       break;
//     case "equipment-type":
//       filteredEquipment = Equipment.filter(
//         (e) =>
//           e.equipment_type &&
//           e.equipment_type.toLowerCase().indexOf(valueClean) > -1
//       );
//       break;
//     case "serial-number":
//       filteredEquipment = Equipment.filter(
//         (e) =>
//           e.serial_number &&
//           e.serial_number.toLowerCase().indexOf(valueClean) > -1
//       );
//       break;
//     case "model-number":
//       filteredEquipment = Equipment.filter(
//         (e) =>
//           e.model_number &&
//           e.model_number.toLowerCase().indexOf(valueClean) > -1
//       );
//       break;
//     default:
//       // Don't filter anything.  Do we want an error case?
//       break;
//   }
//   res.json(filteredEquipment);
// });

/**
 * Search for equipment using the database
 *
 * @TODO: This is a terrible search method and would have major performance problems at scale
 */
app.get("/equipment/search", (req, res) => {
  const { value, queryType } = req.query;
  const valueClean = value.toLowerCase();
  const typeClean = queryType.toLowerCase();
  var sql = "";
  let params = valueClean;
  switch (typeClean) {
    case "manufacturer":
      sql = "SELECT * FROM Equipment WHERE Manufacturer = ? COLLATE NOCASE ";
      break;
    case "equipment-type":
      sql = "SELECT * FROM Equipment WHERE EquipmentType = ? COLLATE NOCASE";
      break;
    case "serial-number":
      sql = "SELECT * FROM Equipment WHERE SerialNumber = ? COLLATE NOCASE";
      break;
    case "model-number":
      sql = "SELECT * FROM Equipment WHERE ModelNumber = ? COLLATE NOCASE";
      break;
    default:
      sql =
        "SELECT * FROM Equipment WHERE Manufacturer = ? COLLATE NOCASE OR EquipmentType = ? COLLATE NOCASE OR SerialNumber = ? COLLATE NOCASE OR ModelNumber = ? COLLATE NOCASE";
      params = [valueClean, valueClean, valueClean, valueClean];
      break;
  }
  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    const equipment = cleanRows(rows);
    res.json(equipment);
  });
});

/**
 * Get the equipment
 */
app.get("/equipment", (req, res) => {
  setTimeout(() => {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    if (randomNum > 7) {
      res.status(500).json({ error: "Ah jeez!" });
    } else {
      const sql = "SELECT * FROM Equipment ORDER BY ID";
      db.all(sql, [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        const equipment = cleanRows(rows);
        res.json(equipment);
      });
    }
  }, 800);
});

/**
 * Delete equipment
 */
app.delete("/equipment/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM Equipment WHERE ID = ?";
  db.run(sql, id, (err) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    return res.status(200).json({});
  });
});

const port = 8100;

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});

/**
 * Utility function to convert from database format to frontend format for equipment
 */
function cleanRows(rows) {
  const equipment = [];

  for (const row of rows) {
    const val = {
      id: row.ID,
      active: row.Active === 1 ? true : false,
      description: row.Description,
      manufacturer: row.Manufacturer,
      model_number: row.ModelNumber,
      serial_number: row.SerialNumber,
      equipment_type: row.EquipmentType,
    };
    if (row.ThumbnailURL) {
      // @TODO: This assumes that we only have a single photo per device.  Need to pull photos from a linked table.
      val.equipment_photos = [
        {
          full_size_url: row.FullSizeURL,
          thumbnail_url: row.ThumbnailURL,
        },
      ];
    }
    equipment.push(val);
  }
  return equipment;
}
