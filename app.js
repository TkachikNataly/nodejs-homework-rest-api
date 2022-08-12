const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/auth");

const app = express();

const tempDir = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
  distination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: multerConfig
})
app.post("/api/contacts", upload.single("cover"), (req, res) => {


})
app.listen(3005);

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;