const express = require("express");
const cookieSession = require("cookie-session");
const app = express();

const authConfig = require("./src/config/auth.config");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Chat app API",
      version: "0.0.1",
      description: "Chat app API documentation",
      contact: {
        name: "Jef van der Avoirt",
        url: "https://github.com/JefvdA"
      },
      license: {
        name: "MIT",
        url: "https://github.com/JefvdA/Chat-app-BE/blob/main/LICENSE"
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local (dev) server"
      },
      {
        url: "https://jefvda-chat-app-api.herokuapp.com/",
        description: "Heroku (prod) server"
      }
    ]
  },
  apis: ["src/routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cookieSession({
    name: "chat-app-session",
    secret: authConfig.cookieSecret,
    httpOnly: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});
app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

// Import routes
const authRouter = require("./src/routes/auth.routes");
const testRouter = require("./src/routes/test.routes");

// Use routes
app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);

module.exports = app;
