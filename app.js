const PORT = process.env.PORT || 3000;
const path = require("path");
const logger = require("./lib/log/logger.js");
const accessLogger = require("./lib/log/accesslogger.js");
const applicationlogger = require("./lib/log/applicationlogger.js");
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

// Express setting
app.set("view engine", "ejs");
app.disable("x-powered-by");

// Static resource routing
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Set access log
app.use(accessLogger());
// Dynamic resource routing
app.use("/", require("./routes/index.js"));

// Set application log
app.use(applicationlogger());

// Execute web application
app.listen(PORT, () => {
  logger.application.info(`Application listening at :${PORT}`);
});