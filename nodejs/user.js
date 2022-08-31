var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passwordHash = require('password-hash');

var querystring = require('querystring');
var request = require('request');

const https = require('https')

const jwt = require("jsonwebtoken")

const jwtKey = "Geefo325tgreREG32tingsEDF32ujnturTDFHJfgh43greSH345ujwkmetHA$#PQMPYHgmERwerPmhgpremhp5owm4noh"
const jwtExpirySeconds = 300

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.use(cors());(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Connection String
var connection_string = { host : 'localhost', user : 'root', port : 3306, password : '',database:'database', multipleStatements: true}
var mysql = require('mysql');

// Login
app.post('/api/login', function (request, response) {

	const { email, password } = request.body;

    try {
        var connection = mysql.createConnection(connection_string);
        connection.connect();

        var query = 'SELECT * FROM users_table WHERE email = ? AND password = ?';

        connection.query(query, [ email, password], function(err, results, fields) {
            if (err){
                response.json({ status: 'error', message:"mysql problem" });
            }else{

                if(results.length == 1)
                {
                    response.json({ status : 'ok'});
                }
                else {
                    response.json({ status : 'error', message:"email or password wrong"});
				}

			}

			response.end();
        });

        connection.end();
    } catch (e) {
        console.log(e.message);
    }
})
//search all
app.post('/api/searchall', function (request, response) {

	const { search } = request.body;

    try {
        var connection = mysql.createConnection(connection_string);
        connection.connect();

        var query = 'SELECT  id_user,manufacturer,model,year,price,col,engine,km,hand,phone_num FROM cars_table WHERE manufacturer LIKE "%"?"%" OR model LIKE "%"?"%"';

        connection.query(query, [ search, search ], function(err, results, fields) {
            if (err){
                response.json({ status: 'error', message:"mysql problem" });
            }else{
                if(results.length>=1)
                response.json({ status : 'ok', data: results});

        if(results.length==0)
        response.json({ status: 'error', message:"error query" });
            }
			response.end();
        });

        connection.end();
    } catch (e) {
        console.log(e.message);
    }
})


//check login
app.post('/api/checklogin', function (request, response) {

	const { is_login } = request.body;

    try {
        var connection = mysql.createConnection(connection_string);
        connection.connect();

        var query = 'UPDATE users_table SET is_login  = ? ';

        connection.query(query, [is_login], function(err, results, fields) {
            if (err){
                response.json({ status: 'error', message:"mysql problem" });
            }else{
               // if(results.length>=1)
                response.json({ status : 'ok', data: results});

      //  if(results.length==0)
      //  response.json({ status: 'error', message:"error query" });
            }
			response.end();
        });

        connection.end();
    } catch (e) {
        console.log(e.message);
    }
})

// Sign Up
app.post('/api/signup', function (request, response) {

    const { email, fname, lname, address, phone_num, password } = request.body;

    try {
        var connection = mysql.createConnection(connection_string);
        connection.connect();

        var query = 'INSERT INTO users_table (email, fname, lname, address, phone_num, password) VALUES (?, ?, ?, ?, ?, ?)';

        connection.query(query, [ email, fname, lname, address, phone_num, password ], function(err, results, fields) {
            if (err){
                response.json({ status: 'error', message:"ההרשמה התבצעה בהצלחה" });
            }else{

                response.json({ status : 'ok' });

			}

			response.end();
        });

        connection.end();
    } catch (e) {
        console.log(e.message);
    }
})

//ads

app.post('/api/addAds', function (request, response) {

    const { id_user , manufacturer , model , year , price ,phone_num,engine, col,km,hand } = request.body;

    try {
        var connection = mysql.createConnection(connection_string);
        connection.connect();

        var query = 'INSERT INTO cars_table (id_user, manufacturer, model, year, price ,phone_num ,engine ,col,km ,hand) VALUES (?, ?, ?, ?, ?, ? ,? ,? ,?,?)';

        connection.query(query, [ id_user, manufacturer, model, year, price,phone_num,engine,col,km,hand ], function(err, results, fields) {
            if (err){
                response.json({ status: 'error', message:"הפקודה לא התבצעה" });
            }else{

                response.json({ status : 'ok' });

			}

			response.end();
        });

        connection.end();
    } catch (e) {
        console.log(e.message);
    }
})

//send contact
app.post('/api/contact', function (request, response) {

    const { name, email, msg } = request.body;

    try {
        var connection = mysql.createConnection(connection_string);
        connection.connect();

        var query = 'INSERT INTO contact_table (name, email, msg) VALUES (?, ?, ?)';

        connection.query(query, [ name,email,msg], function(err, results, fields) {
            if (err){
                response.json({ status: 'error', message:"the msg not send" });
            }else{

                response.json({ status : 'ok' });

			}

			response.end();
        });

        connection.end();
    } catch (e) {
        console.log(e.message);
    }
})

// Get User Information
app.post('/api/get_user', function (request, response) {

	const { is_login } = request.body;

    try {
        var connection = mysql.createConnection(connection_string);
        connection.connect();

        var query = 'SELECT * FROM users_table WHERE is_login = ?';

        connection.query(query, [ is_login ], function(err, results, fields) {
            if (err){
                response.json({ status: 'error', message:"mysql problem" });
            }else{

                if(results.length > 0)
                {
                    response.json({ status : 'ok' ,data:results});
                }
                else {
                    response.json({ status : 'error', message:"encpass is wrong"});
				}

			}

			response.end();
        });

        connection.end();
    } catch (e) {
        console.log(e.message);
    }
})

app.listen(3000, function () {
    console.log('server started');
})
