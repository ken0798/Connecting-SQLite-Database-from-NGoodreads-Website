const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const pathDb = path.join(__dirname, "goodreads.db");

async function dbServer() {
  try {
    const db = await open({
      filename: pathDb,
      driver: sqlite3.Database,
    });
    app.get("/", async (req, res) => {
      const bookQuery = `
            SELECT
            *
            FROM
            Book
            ORDER BY
            book_id;`;
      const data = await db.all(bookQuery);
      res.send(data);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

dbServer();

app.listen(port, () => {
  console.log(`server is running on port:${port}`);
});

// open({
//   filename: pathDb,
//   driver: sqlite3.Database,
// })
//   .then((dbResponse) => {
//     app.get("/", async (req, res) => {
//       const makeQuery = `
//         SELECT
//         *
//         FROM
//         Book
//         ORDER BY
//         book_id;`;
//       const data = await dbResponse.all(makeQuery);
//       res.send(data);
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//     process.exit(1);
//   });

// open({
//   filename: pathDb,
//   driver: sqlite3.Database,
// })
//   .then((dbResponse) => {
//     app.get("/", async(req, res) => {
//       const makeQuery = `
//         SELECT
//         *
//         FROM
//         Book
//         ORDER BY
//         book_id;`;
//       dbResponse.all(makeQuery).then((data) => {
//         res.send(data);
//       });
//     });
//   })
//   .catch((err) => {
//     console.log(err.message);
//     process.exit(1);
//   });
