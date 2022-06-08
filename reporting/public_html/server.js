if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: '/var/run/mysqld/mysqld.sock',
  user: 'liam',
  password: 'LIAM20forSQL!',
  database: 'ReportingDatabase'
});

// Connect ONCE
connection.connect(function (err) {
  if (err) throw err;
})

const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => (user.email.toLowerCase() === email.toLowerCase()) || (user.name.toLowerCase() === email.toLowerCase())),
  id => users.find(user => user.id === id)
)

var users = []

// grab all users in database (lol this would be trash in a real app)
connection.query("SELECT * FROM userInfo;", (err, rows, fields) => {
  //console.log(rows[0]['name']);

  for (let i = 0; i < rows.length; i++) {
    users.push({
      id: rows[i]['id'],
      isAdmin: rows[i]['isAdmin'],
      name: rows[i]['name'],
      email: rows[i]['email'],
      password: rows[i]['password']
    })
  }
});

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  // hard-code if not working
  secret: 'secret',
  // secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

// create application/json parser
var jsonParser = bodyParser.json()

// Add parser for JSON and urlencoded forms
app.use(jsonParser);

app.get('/', checkAuthenticated, (req, res) => {
  //these are not empty
  //console.log(req.user)
  //console.log(users)
  res.setHeader('Cache-Control', 'no-cache')
  res.render('./authapp/index.ejs', { name: req.user.name, isAdmin: users.find(u => req.user.name.toLowerCase() === u.name.toLowerCase()).isAdmin })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.setHeader('Cache-Control', 'no-cache')
  res.render('./authapp/login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  failureRedirect: '/authapp/login',
  failureFlash: true
}),
  function(req, res) {
    res.render('./authapp/index.ejs', { name: req.user.name, isAdmin: users.find(u => req.user.name.toLowerCase() === u.name.toLowerCase()).isAdmin })
  })

/*app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return next(err);
    if (!user) return res.render('./authapp/login.ejs');   
    // TODO: how to add failureFlash?
    // TODO: what if user exist but password wrong?
    
    req.logIn(user, function (err) {
      if (err) return next(err);

      if (Number(user['isAdmin']) == 1) return res.render('./authapp/index.ejs', { name: req.user.name, isAdmin: user['isAdmin'] });
      else return res.redirect('/authapp');
    });
  })(req, res, next);
});*/

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('./authapp/register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    userID = Date.now().toString()
    users.push({
      id: userID,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    // Change users to work with our sql server
    // Storing into SQL server
    connection.query("INSERT INTO userInfo (name, email, password, isAdmin, id) VALUES (?, ?, ?, ?, ?);",
      [req.body.name, req.body.email, hashedPassword, 0, userID],
      (err, rows, fields) => { }
    );
    res.redirect('/authapp/login')
  } catch {
    res.redirect('/authapp/register')
  }
})

app.post('/users', checkAuthenticated, (req, res) => {
  //console.log(req.body) --> empty :(
  res.setHeader('Cache-Control', 'no-cache')
  res.render('./authapp/users.ejs')
})

// hidden link on purpose
// READ
app.get('/123123', (req, res) => { 
  connection.query("SELECT * from userInfo;", (err, rows, fields) => {
      res.json(rows);
  });
});

// CREATE
app.post('/123123', async (req, res) => {
  //console.log('POST')
  console.log(req.body);
  if(req.body.name != "" && req.body.email != "" && req.body.password != "" && req.body.isAdmin !== "" && req.body.id != "") {
    // if isAdmin is positive non-zero just set it to 1
    if(req.body.isAdmin > 0) {
      packet_isAdmin = 1;
    } else {
      packet_isAdmin = 0;
    }

    // set id to timestamp
    packet_id = Date.now().toString();

    // set rest of vars
    packet_name = req.body.name;
    packet_email = req.body.email;
    packet_hashedPass = await bcrypt.hash(req.body.password, 10);

    console.log(packet_hashedPass);

    const jsonPacket = {name: packet_name, email: packet_email, password: packet_hashedPass, isAdmin: packet_isAdmin, id: packet_id};

    //Update users
    users.push({
      id: packet_id,
      isAdmin: packet_isAdmin,
      name: packet_name,
      email: packet_email,
      password: packet_hashedPass
    })
    //Update SQL server
    connection.query("INSERT INTO userInfo (name, email, password, isAdmin, id) VALUES (?, ?, ?, ?, ?);", [packet_name, packet_email, packet_hashedPass, packet_isAdmin, packet_id], (err, rows, fields) => {
        
    });

    res.json(jsonPacket);

    // Maybe it should be a feature they can see their input before reload?
  } else {
    res.sendStatus(400);
  }
});

// DELETE
app.delete('/123123/:id', (req, res) => {
  //console.log('DELETE', req.params.id) 
  //console.log(req.body); --> empty
  //console.log(req.params); --> has id

  // Delete from users
  users = users.filter(user => user.id != req.params.id );
  console.log(users);

  // Delete from SQL
  connection.query("DELETE FROM userInfo WHERE id = ?;", [req.params.id], (err, rows, fields) => { });
    
  res.sendStatus(200);
});

// UPDATE cell
app.patch('/123123/:id', (req, res) => {
  console.log('PATCH', req.params.id) 
  // has the edited value
  console.log(req.body);
  // has the id
  console.log(req.params);

  // Update users
  usersIndex = users.findIndex(user => user.id == req.params.id);
  key = Object.keys(req.body)[0];

  if(key == 'isAdmin' && req.body[key] === '')
    req.body[key] = 0;

  users[usersIndex][key] = req.body[key];

  console.log(users);
  
  // Update SQL
  connection.query("INSERT INTO userInfo (name, email, password, isAdmin, id) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = ?, email = ?, password = ?, isAdmin = ?, id = ?;", [users[usersIndex]['name'], users[usersIndex]['email'], users[usersIndex]['password'], users[usersIndex]['isAdmin'], users[usersIndex]['id'], users[usersIndex]['name'], users[usersIndex]['email'], users[usersIndex]['password'], users[usersIndex]['isAdmin'], users[usersIndex]['id']], (err, rows, fields) => {
        
  });

  res.sendStatus(200);
});

// UPDATE row
app.put('/123123/:id', (req, res) => { 
  console.log('PUT', req.params.id) 
  // has all the values
  console.log(req.body);
  // has the id
  console.log(req.params);

  // Update users
  usersIndex = users.findIndex(user => user.id == req.params.id);
  users[usersIndex].name = req.body.name;
  users[usersIndex].email = req.body.email;
  users[usersIndex].password = req.body.password;

  if(req.body.isAdmin === '')
    req.body.isAdmin = 0;

  users[usersIndex].isAdmin = req.body.isAdmin;
  users[usersIndex].id = req.body.id;

  console.log(users);

  // Update SQL
  connection.query("INSERT INTO userInfo (name, email, password, isAdmin, id) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = ?, email = ?, password = ?, isAdmin = ?, id = ?;", [users[usersIndex]['name'], users[usersIndex]['email'], users[usersIndex]['password'], users[usersIndex]['isAdmin'], users[usersIndex]['id'], users[usersIndex]['name'], users[usersIndex]['email'], users[usersIndex]['password'], users[usersIndex]['isAdmin'], users[usersIndex]['id']], (err, rows, fields) => {
        
  });

  res.sendStatus(200);
});

app.delete('/logout', (req, res) => {
  // logout() is now an async function after version 0.6.0
  req.logOut(function (err) {
    if (err) { return next(err); }
    res.redirect('/authapp/login')
  })
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/authapp/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/authapp')
  }
  next()
}

app.listen(3003)