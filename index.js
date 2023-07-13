const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

// Creating the Express server
const app = express();

// Server configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

// Connect database
const db_name = path.join(__dirname, "data", "apptest.db");
const db = new sqlite3.Database(db_name, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful connection to the database 'apptest.db'");
});

const sql_create = `CREATE TABLE IF NOT EXISTS user (
  STT INTEGER PRIMARY KEY AUTOINCREMENT,
  AccRootchain VARCHAR(100) NOT NULL,
  PKRootchain VARCHAR(100) NOT NULL,
  RPCRootchain VARCHAR(100) NOT NULL,
  AddTokenRootchain VARCHAR(100) NOT NULL
);`;

db.run(sql_create, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful creation of the 'user' table");
});

// Database seeding
const sql_insert = `INSERT INTO user (STT, AccRootchain, PKRootchain, RPCRootchain, AddTokenRootchain) VALUES
 (1, '0x35A657d6994E48d600De79308cF5Cc7EbA7b1Ef8', 'e8b9049bda2bdb4e7c60ea183933d5b1124e0282ed9d33a4ac87715e62d7a858', 'http://18.224.19.137:8545', '0x94C3a87e8C470C73DcFb825dB699cB3C29d8Fc36')`;

db.run(sql_insert, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Successful add information user");
});

// Starting the server
app.listen(3000, () => {
  console.log("Server started (http://localhost:3000/) !");
});

// GET /
app.get("/", (req, res) => {
  // res.send("Hello world...");
  res.render("index");
});

// GET /about
app.get("/about", (req, res) => {
  res.render("about");
});

// GET /data
app.get("/data", (req, res) => {
  const test = {
    title: "Test",
    items: ["one", "two", "three"],
  };
  res.render("data", { model: test });
});

app.get("/user", (req, res) => {
  const sql = "SELECT * FROM user ORDER BY STT";
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.render("user", { model: rows });
  });
});

const { exec } = require("child_process");

app.get("/spnet", (req, res) => {
  const command =
    "go run D:/workspace/task_company/polygon-edge/main.go server --data-dir ./test-chain-1 --chain genesis.json --grpc-address :5001 --libp2p :30301 --jsonrpc :10001 --seal --relayer --num-block-confirmations 10";

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Command execution error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Command execution stderr: ${stderr}`);
      return;
    }

    console.log(`Command execution stdout: ${stdout}`);
    // Tiếp tục xử lý hoặc trả về phản hồi cho yêu cầu HTTP tại đây
  });
});

// // GET /edit/5
// app.get("/edit/:id", (req, res) => {
//   const id = req.params.id;
//   const sql = "SELECT * FROM Books WHERE Book_ID = ?";
//   db.get(sql, id, (err, row) => {
//     // if (err) ...
//     res.render("edit", { model: row });
//   });
// });

// // POST /edit/5
// app.post("/edit/:id", (req, res) => {
//   const id = req.params.id;
//   const book = [req.body.Title, req.body.Author, req.body.Comments, id];
//   const sql =
//     "UPDATE Books SET Title = ?, Author = ?, Comments = ? WHERE (Book_ID = ?)";
//   db.run(sql, book, (err) => {
//     // if (err) ...
//     res.redirect("/books");
//   });
// });
