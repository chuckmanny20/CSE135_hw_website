// app.js file

const jsonServer = require('/usr/local/lib/node_modules/json-server');
const mysql = require('mysql');
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

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

// Add custom routes
server.get('/static', (req, res) => { 
    connection.query("SELECT * from Static;", (err, rows, fields) => {
        res.json(rows);
    });
 });

// Returns an Express router
var router = jsonServer.router('db_api.json');

server.use(router);

server.listen(3001);
