const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const path = require('path');

//bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//serving static files
app.use(express.static(path.join(__dirname, 'public')));

//route to see the result for the admin
app.get('/result', function(req, res) {
    res.sendFile(path.join(__dirname, 'public' + '/resultEnabled.html'));
});

//connect to db on success run the server
mongoose.connect(config.MONGO_DB_URI,{ useMongoClient: true }, function(err, connected){
    if(err)
        console.log(err);

    else
        app.listen(process.env.PORT || 3000);
});

const api = require('./api');
app.use('/',api);




