const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/database');
const passport = require('passport');

// -------------- GENERAL SETUP ----------------
require('dotenv').config();

const app = express();

connectDB();

require('./models/user');

// Pass the global passport object into the configuration function
require('./config/passport')(passport);

// This will initialize the passport object on every request
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({extended: true}));


// Allows our Angular application to make HTTP requests to Express application
//app.use(cors());

// Where Angular builds to - In the ./angular/angular.json file, you will find this configuration
// at the property: projects.angular.architect.build.options.outputPath
// When you run `ng build`, the output will go to the ./public directory

//frontend files served directly by Express
//app.use(express.static(path.join(__dirname, 'public')));


// -------------- ROUTES ----------------
app.use(require('./routes'));

// -------------- SERVER ----------------
app.listen(3000, () => {
});
