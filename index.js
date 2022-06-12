const app = require("./app");
const port = 3000;

const db = require("./src/models");
const dbConfig = require("./src/config/db.config");

// DB Connection
db.mongoose
  .connect(dbConfig.url, dbConfig.options)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

db.init();

// Express app
app.listen(port, () => {
  console.log(`Chat-app API listening on port ${port}!`);
});