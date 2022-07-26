// const app = require('./app')

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })

const mongoose = require("mongoose");

const app = require("./app")

const { DB_HOST, PORT = 3000 } = process.env;

console.log(DB_HOST);
mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch(error => {
    console.log(error);
    process.exit(1);
  })
