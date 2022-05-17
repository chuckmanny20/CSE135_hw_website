// app.js file

const jsonServer = require('/usr/local/lib/node_modules/json-server');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { connect } = require('http2');
const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '/var/run/mysqld/mysqld.sock',
    user     : 'liam',
    password : 'LIAM20forSQL!',
    database : 'CollectorDatabase'
});

// Connect ONCE
connection.connect(function (err) {
    if(err) throw err;
})

// Returns an Express server
const server = jsonServer.create();

// create application/json parser
var jsonParser = bodyParser.json()

// Set default middlewares (logger, static, cors and no-cache)
//server.use(jsonServer.defaults());
server.use(jsonParser);
server.use(bodyParser.urlencoded({ extended: true }));

// Add custom routes
// Basic GET all's
server.get('/static', (req, res) => { 
    connection.query("SELECT * from Static;", (err, rows, fields) => {
        res.json(rows);
    });
});

server.get('/performance', (req, res) => { 
    connection.query("SELECT * from Performance;", (err, rows, fields) => {
        res.json(rows);
    });
});

server.get('/activity', (req, res) => { 
    connection.query("SELECT * from Activity;", (err, rows, fields) => {
        res.json(rows);
    });
});

// GET specific ID
server.get('/static/:Pageid', (req, res) => { 
    let PageID = req.params.Pageid

    connection.query("SELECT * from Static WHERE Pageid = ?;", [PageID], (err, rows, fields) => {
        res.json(rows);
    });
});

server.get('/performance/:Pageid', (req, res) => { 
    let PageID = req.params.Pageid

    connection.query("SELECT * from Performance WHERE Pageid = ?;", [PageID], (err, rows, fields) => {
        res.json(rows);
    });
});

server.get('/activity/:Pageid', (req, res) => { 
    let PageID = req.params.Pageid

    connection.query("SELECT * from Activity WHERE Pageid = ?;", [PageID], (err, rows, fields) => {
        res.json(rows);
    });
});

// POSTs
server.post('/static', (req, res) => {
    console.log(req.body.Pageid);

    //connection.query()

    res.send('Saved to Static table!');
});

// Returns an Express router
var router = jsonServer.router('db_api.json');

server.use(router);

server.listen(3001);
