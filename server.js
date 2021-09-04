const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

//  const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.set("view-engine", "ejs");

const users = [];

// Main Page [ http://localhost:3000 ]

app.get("/", (req, res) => {
  res.render("index.ejs", { name: "Igal" });
});

// Login Page [ http://localhost:3000/login ]

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {});

// Registration Page [ http://localhost:3000/register ]

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login");
  } catch (err) {
    res.redirect("/register");
  }
  console.log(users);
});

app.listen(3000);
console.log("Server is on");
