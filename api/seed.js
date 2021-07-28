const Equipment = require("./equipmentData");
const path = require("path");

function createAll() {
  const sqlite3 = require("sqlite3").verbose();
  const db_name = path.join(__dirname, "86repairs.db");
  const db = new sqlite3.Database(db_name, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successful connection to the database '86repairs.db'");
  });

  var sql_create = `DROP TABLE IF EXISTS Tickets;`;

  db.run(sql_create, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successfully deleted the 'Tickets' table");

    sql_create = `CREATE TABLE IF NOT EXISTS Tickets (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      EquipmentSerial VARCHAR(100) NOT NULL,
      Problem TEXT
    );`;

    db.run(sql_create, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successfully created the 'Tickets' table");
    });
  });

  sql_create = `DROP TABLE IF EXISTS Equipment;`;

  db.run(sql_create, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Successfully deleted the 'Equipment' table");
    sql_create = `CREATE TABLE IF NOT EXISTS Equipment (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      Active BOOLEAN NOT NULL DEFAULT true, 
      SerialNumber VARCHAR(100) NOT NULL,
      Manufacturer VARCHAR(255),
      ModelNumber VARCHAR(255) NOT NULL,
      EquipmentType VARCHAR(255) NOT NULL,
      FullSizeURL VARCHAR(255),
      ThumbnailURL VARCHAR(255),
      Description TEXT
    );`;

    db.run(sql_create, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Successfully created the 'Equipment' table");
      for (const machine of Equipment) {
        const active = machine.active ? 1 : 0;
        const serial_number = machine.serial_number;
        const manufacturer = machine.manufacturer;
        const model_number = machine.model_number;
        const equipment_type = machine.equipment_type;
        const description = machine.description;
        let full_size_url = "";
        let thumbnail_url = "";
        if (machine.equipment_photos && machine.equipment_photos.length > 0) {
          full_size_url = machine.equipment_photos[0].full_size_url;
          thumbnail_url = machine.equipment_photos[0].thumbnail_url;
        }

        const sql = `INSERT INTO Equipment (
          Active,
          SerialNumber,
          Manufacturer,
          ModelNumber,
          EquipmentType,
          FullSizeURL,
          ThumbnailURL,
          Description
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        const entry = [
          active,
          serial_number,
          manufacturer,
          model_number,
          equipment_type,
          full_size_url,
          thumbnail_url,
          description,
        ];
        db.run(sql, entry, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  });
}
createAll();
