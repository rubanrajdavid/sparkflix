const app = require("express")();
const express = require("express")
const morgan = require("morgan");
const bodyParser = require("body-parser");
const Handlebars = require('handlebars')
const hbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const path = require("path");
const socketController = require("./src/controllers/sampleSocket")
const mongooseConnection = require('./src/configurations/mongoConnection')
require("dotenv").config();

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.sockets.on('connection', socketController.connected);

//Setup for Handlebars
app.set("views", path.join(__dirname, "src/views"));
app.engine(
    "handlebars",
    hbs({
        defaultLayout: "main",
        layoutsDir: path.join(__dirname, "/src/views/layouts"),
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }),
);
app.set("view engine", "handlebars");

//Retiving data from req sent as JSON in body
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());
app.use(bodyParser.raw());

//Routes
app.use("/", require("./src/routes/sfAppRouter"));

//MongoDB Connection
mongooseConnection();

//Add Public as Static folder
app.use(express.static("./src/views/public"));

//Start Express Server
http.listen(process.env.APP_PORT, () => {
    console.log(`App Connected`);
});