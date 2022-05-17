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
server.use(jsonServer.defaults());

// Add parser for JSON and urlencoded forms
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
    //console.log(req.body.Pageid);
    //console.log(req.body.staticCollection);
    
    staticCollection = JSON.parse(req.body.staticCollection);

    connection.query("INSERT INTO Static (Pageid, Userid, isCSSAllowed, isImageAllowed, isJSAllowed, userAgentStr, userCookieAcceptance, userLang, userNetworkConnectionType, userScreenHeight, userScreenWidth, userWindowHeight, userWindowWidth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [req.body.Pageid, req.body.Userid, staticCollection != null ? staticCollection['isCssAllowed'] : null, staticCollection != null ? staticCollection['isImageAllowed'] : null, staticCollection != null ? staticCollection['isJsAllowed'] : null, staticCollection != null ? staticCollection['userAgentStr'] : null, staticCollection != null ? staticCollection['userCookieAcceptance'] : null, staticCollection != null ? staticCollection['userLang']: null, staticCollection != null ? staticCollection['userNetworkConnectionType'] : null, staticCollection != null ? staticCollection['userScreenHeight'] : null, staticCollection != null ? staticCollection['userScreenWidth'] : null, staticCollection != null ? staticCollection['userWindowHeight'] : null, staticCollection != null ? staticCollection['userWindowWidth'] : null], (err, rows, fields) => {
        
    });

    res.send('Saved to Static table!');
});

server.post('/performance', (req, res) => {
    //console.log(req.body.Pageid);
    //console.log(req.body.performanceCollection);

    performanceCollection = JSON.parse(req.body.performanceCollection);

    console.log(req.body.Pageid);
    console.log(req.body.Userid);
    console.log(parseFloat(performanceCollection['timeStartLoad']));
    console.log(parseFloat(performanceCollection['timeEndLoad']));
    console.log(parseFloat(performanceCollection['timeTotalLoad']));
    console.log(performanceCollection['wholeTimingObject']);

    connection.query("INSERT INTO Performance (Pageid, Userid, timeStartLoad, timeEndLoad, timeTotalLoad, wholeTimingObject) VALUES (?, ?, ?, ?, ?, ?);", [req.body.Pageid, req.body.Userid, performanceCollection != null ? parseFloat(performanceCollection['timeStartLoad']) : null, performanceCollection != null ? parseFloat(performanceCollection['timeEndLoad']) : null, performanceCollection != null ? parseFloat(performanceCollection['timeTotalLoad']) : null, performanceCollection != null ? performanceCollection['wholeTimingObject'] : null], (err, rows, fields) => {
        
    });

    res.send('Saved to Performance table!');
});

server.post('/activity', (req, res) => {
    console.log(req.body.Pageid);

    console.log(req.body.cursorPosCollection);

    connection.query("INSERT INTO Activity (Pageid, Userid, idleEndList, idleLengthList, cursorPosCollection, clickCollection, scrollCollection, keyboardCollection, visibleCollection, curPage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [req.body.Pageid, req.body.Userid, req.body.idleEndList, req.body.idleLengthList, req.body.cursorPosCollection, req.body.clickCollection, req.body.scrollCollection, req.body.keyboardCollection, req.body.visibleCollection, req.body.curPage], (err, rows, fields) => {
        
    });

    res.send('Saved to Activity table!');
});

// DELETE specific ID
server.delete('/static/:Pageid', (req, res) => { 
    let PageID = req.params.Pageid

    connection.query("DELETE FROM Static WHERE Pageid = ?;", [PageID], (err, rows, fields) => {
        
    });

    res.send('Deleted from Static table!');
});

server.delete('/performance/:Pageid', (req, res) => { 
    let PageID = req.params.Pageid

    connection.query("DELETE FROM Performance WHERE Pageid = ?;", [PageID], (err, rows, fields) => {
        
    });

    res.send('Deleted from Performance table!');
});

server.delete('/activity/:Pageid', (req, res) => { 
    let PageID = req.params.Pageid

    connection.query("DELETE FROM Activity WHERE Pageid = ?;", [PageID], (err, rows, fields) => {
        
    });

    res.send('Deleted from Activity table!');
});

// PUT specific ID
// PUT is a full update so it should have ALL the content
server.put('/static/:Pageid', (req, res) => { 
    connection.query("INSERT INTO Static (Pageid, Userid, isCSSAllowed, isImageAllowed, isJSAllowed, userAgentStr, userCookieAcceptance, userLang, userNetworkConnectionType, userScreenHeight, userScreenWidth, userWindowHeight, userWindowWidth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Userid = ?, isCSSAllowed = ?, isImageAllowed = ?, isJSAllowed = ?, userAgentStr = ?, userCookieAcceptance = ?, userLang = ?, userNetworkConnectionType = ?, userScreenHeight = ?, userScreenWidth = ?, userWindowHeight = ?, userWindowWidth = ?;", [req.body.Pageid, req.body.Userid, staticCollection != null ? staticCollection['isCssAllowed'] : null, staticCollection != null ? staticCollection['isImageAllowed'] : null, staticCollection != null ? staticCollection['isJsAllowed'] : null, staticCollection != null ? staticCollection['userAgentStr'] : null, staticCollection != null ? staticCollection['userCookieAcceptance'] : null, staticCollection != null ? staticCollection['userLang']: null, staticCollection != null ? staticCollection['userNetworkConnectionType'] : null, staticCollection != null ? staticCollection['userScreenHeight'] : null, staticCollection != null ? staticCollection['userScreenWidth'] : null, staticCollection != null ? staticCollection['userWindowHeight'] : null, staticCollection != null ? staticCollection['userWindowWidth'] : null, req.body.Userid, staticCollection != null ? staticCollection['isCssAllowed'] : null, staticCollection != null ? staticCollection['isImageAllowed'] : null, staticCollection != null ? staticCollection['isJsAllowed'] : null, staticCollection != null ? staticCollection['userAgentStr'] : null, staticCollection != null ? staticCollection['userCookieAcceptance'] : null, staticCollection != null ? staticCollection['userLang']: null, staticCollection != null ? staticCollection['userNetworkConnectionType'] : null, staticCollection != null ? staticCollection['userScreenHeight'] : null, staticCollection != null ? staticCollection['userScreenWidth'] : null, staticCollection != null ? staticCollection['userWindowHeight'] : null, staticCollection != null ? staticCollection['userWindowWidth'] : null], (err, rows, fields) => {
        
    });

    res.send('Saved to Static table!');
});

server.put('/performance/:Pageid', (req, res) => { 
    performanceCollection = JSON.parse(req.body.performanceCollection);

    connection.query("INSERT INTO Performance (Pageid, Userid, timeStartLoad, timeEndLoad, timeTotalLoad, wholeTimingObject) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Userid = ?, timeStartLoad = ?, timeEndLoad = ?, timeTotalLoad = ?, wholeTimingObject = ?;", [req.body.Pageid, req.body.Userid, performanceCollection != null ? performanceCollection['timeStartLoad'] : null, performanceCollection != null ? performanceCollection['timeEndLoad'] : null, performanceCollection != null ? performanceCollection['timeTotalLoad'] : null, performanceCollection != null ? performanceCollection['wholeTimingObject'] : null, req.body.Userid, performanceCollection != null ? performanceCollection['timeStartLoad'] : null, performanceCollection != null ? performanceCollection['timeEndLoad'] : null, performanceCollection != null ? performanceCollection['timeTotalLoad'] : null, performanceCollection != null ? performanceCollection['wholeTimingObject'] : null], (err, rows, fields) => {
        
    });

    res.send('Saved to Performance table!');
});

server.put('/activity/:Pageid', (req, res) => { 
    connection.query("INSERT INTO Activity (Pageid, Userid, idleEndList, idleLengthList, cursorPosCollection, clickCollection, scrollCollection, keyboardCollection, visibleCollection, curPage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE Userid = ?, idleEndList = ?, idleLengthList = ?, cursorPosCollection = ?, clickCollection = ?, scrollCollection = ?, keyboardCollection = ?, visibleCollection = ?, curPage = ?;", [req.body.Pageid, req.body.Userid, req.body.idleEndList, req.body.idleLengthList, req.body.cursorPosCollection, req.body.clickCollection, req.body.scrollCollection, req.body.keyboardCollection, req.body.visibleCollection, req.body.curPage, req.body.Userid, req.body.idleEndList, req.body.idleLengthList, req.body.cursorPosCollection, req.body.clickCollection, req.body.scrollCollection, req.body.keyboardCollection, req.body.visibleCollection, req.body.curPage], (err, rows, fields) => {
        
    });

    res.send('Saved to Activity table!');
});

// Returns an Express router
var router = jsonServer.router('db_api.json');

server.use(router);

server.listen(3001);
