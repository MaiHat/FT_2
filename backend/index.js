import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "frontend/build")));



app.get("/", (req, res) => {
});

app.get("/signup", (req, res) => {
});

app.get("/login", (req, res) => {
  
});

app.get("/home", (req, res) => {
  
})

app.post("/submit", (req, res) => {
  const name = req.body["userName"];
  const email = req.body["email"];
  const password = req.body["password"];
  const confirmPassword = req.body["confirmPassword"];
  console.log(name);
  console.log(email);
  console.log(password);
  console.log(confirmPassword);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
