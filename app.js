const express = require("express");
var path = require("path");
const { commit } = require("./db/db");
const app = express();
const db = require("./db/db");
const port = 3000;
app.use(express.static(path.join(__dirname, "Public")));
app.use(express.urlencoded({ extended: false }));

app.get("", (req, res) => {
  db.execute("select * from blogposts", (err, data) => {
    res.render("index.ejs", { data });
  });
});
app.get("/info/:id", (req, res) => {
  db.execute(
    `select * from blogposts where Id=${req.params.id}`,
    (err, data) => {
      res.render("info.ejs", { data });
    }
  );
});
app.post("/search", (req, res) => {
  const { searchKey } = req.body;
  db.execute(
    `SELECT * FROM blogposts WHERE blogposts.title LIKE '%${searchKey}%'`,
    (err, data) => {
      res.render("index.ejs", { data });
    }
  );
});
app.post("/searchds", (req, res) => {
  const { searchKey } = req.body;
  db.execute(
    `SELECT * FROM blogposts WHERE blogposts.title LIKE '%${searchKey}%'`,
    (err, data) => {
      res.render("dash.ejs", { data });
    }
  );
});
app.get("/dashboard", (req, res) => {
  db.execute("select * from blogposts", (err, data) => {
    res.render("dash.ejs", { data });
  });
});
app.post("/add", (req, res) => {
  const { title, body } = req.body;
  db.execute(
    `INSERT INTO blogposts (title, body) VALUES ('${title}', '${body}')`
  );
  res.redirect("/dashboard");
});
app.get("/create", (req, res) => {
  res.render("create.ejs");
});
app.get("/delete/:id", (req, res) => {
  db.execute(`delete from blogposts where Id=${req.params.id}`);
  res.redirect("/dashboard");
});
app.get("/update/:id", (req, res) => {
  db.execute(
    `select * from blogposts where Id=${req.params.id}`,
    (err, data) => {
      res.render("update.ejs", { data });
    }
  );
});

app.post("/updatedb/:id", (req, res) => {
  const { title, body } = req.body;
console.log()
  db.execute(
    `UPDATE blogposts SET title='${title}', body='${body}' WHERE Id=${req.params.id}`  );
  res.redirect("/dashboard");
});
app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
