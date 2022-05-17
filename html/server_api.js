// app.js file

const jsonServer = require('/usr/local/lib/node_modules/json-server');
const mysql = require('mysql');
const connection = mysql.createConnection({
   host     : 'ubuntu-s-2vcpu-2gb-sfo3-01',
   user     : 'root',
   password : 'CSE135forSQL!',
   database : 'CollectorDatabase'
});

// Returns an Express server
const server = jsonServer.create();

// Set default middlewares (logger, static, cors and no-cache)
server.use(jsonServer.defaults());

// Add custom routes
server.get('/static', (req, res) => { 

    connection.connect(function (err) {
        if(err) throw err;
        connection.query("SELECT * from Static;", (err, rows, fields) => {
            console.log("I think we fetched");
            res.json(rows);
        });
    })
 });

// Returns an Express router
var router = jsonServer.router('db_api.json');

server.use(router);

server.listen(3001);
