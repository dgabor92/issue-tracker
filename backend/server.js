require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.SERVER_PORT;
const dbhost = process.env.DB_HOST;
const dbport = process.env.DB_PORT;
const dbname = process.env.DB_NAME;
const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASSWORD;
const { Pool } = require("pg");
const Chance = require("chance");
const chance = new Chance();

const pool = new Pool({
  host: dbhost,
  port: dbport,
  database: dbname,
  user: dbuser,
  password: dbpassword,
});

app.use(express.json());

// API Endpoints

// Create new issue
app.post("/api/issues", (req, res) => {
  const { description, severity, assignedTo } = req.body;
  const issueId = chance.guid();
  const issueStatus = "Open";
  pool.query(
    "SELECT COUNT(*) FROM issues WHERE description = $1",
    [description],
    (error, results) => {
      if (error) {
        throw error;
      }
      const count = parseInt(results.rows[0].count);
      if (count > 0) {
        res.status(400).send("This issue already exists!");
      } else {
        // Hozzáadás az adatbázishoz
        pool.query(
          "INSERT INTO issues (id, description, severity, assigned_to, status) VALUES ($1, $2, $3, $4, $5)",
          [issueId, description, severity, assignedTo, issueStatus],
          (error, results) => {
            if (error) {
              throw error;
            }
            res.status(201).send("New issue added!");
          }
        );
      }
    }
  );
});

// All issues list
app.get("/api/issues", (req, res) => {
  pool.query("SELECT * FROM issues ORDER BY id DESC", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

// Issue status update
app.put("/api/issues/:id", (req, res) => {
  const { id } = req.params;

  pool.query(
    "UPDATE issues SET status = $1 WHERE id = $2",
    ["Closed", id],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send("Az issue állapota frissítve!");
    }
  );
});

// Issue delete
app.delete("/api/issues/:id", (req, res) => {
  const { id } = req.params;

  pool.query("DELETE FROM issues WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).send("Az issue törölve!");
  });
});

app.listen(port, () => {
  console.log(`A szerver fut a ${port}. porton...`);
});