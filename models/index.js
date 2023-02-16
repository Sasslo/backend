require("dotenv").config();
var fs = require("fs");
var path = require("path");
var mongoose = require('mongoose');

var basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
let config = require("../services.json")[ENV];

var db = {}

mongoose.set('strictQuery', false);

mongoose.connect(config.db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB", err);
    });

// mongoose create schema from models in the models folder
fs.readdirSync(__dirname)
    .filter(function (file) {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach(function (file) {
        var modalName = file.slice(0, -3)
        var modalSchema = require(path.join(__dirname, file))(mongoose);

        // create a model from the schema
        var model = mongoose.model(modalName, modalSchema);
        db[modalName] = model;
    });

module.exports = db;