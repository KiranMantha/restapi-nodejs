var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    bodyParser = require('body-parser'),
    conn = mongoose.connection,
    options = {
        useNewUrlParser: true
    };

// mongoose instance connection url connection
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://restapi_user:restapi@cluster-restapi-db-woskg.mongodb.net/test?retryWrites=true', options);

conn.on('error', function (err) {
    console.log('Some problem with the connection ' + err);
});

conn.once('open', function () {
    conn.model('task', Task);
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    var routes = require('./api/routes/todoListRoutes'); //importing route
    routes(app); //register the route

    app.listen(port);

    console.log('todo list RESTful API server started on: ' + port);
});

// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb+srv://restapi_user:restapi@cluster-restapi-db-woskg.mongodb.net/test?retryWrites=true";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("restapi_db");
//   dbo.collection("customers").find({}, { _id: 0, name: 1 }).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });