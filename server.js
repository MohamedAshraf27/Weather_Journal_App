// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log(`Port number is: ${port}`);
    console.log("Server is up and running!");
};

app.get("/all", function(req, res) {
    res.send(projectData);
    projectData = [];
});

app.post("/inData", inData);

function inData(req, res) {
    let entry = {
        date: req.body.date,
        temperature: req.body.temperature,
        userRes: req.body.userRes
    }
    projectData = entry;
};