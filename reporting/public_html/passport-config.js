const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserByName, getUserById) {
  const authenticateUser = async (email, name, password, done) => {
    if(getUserByEmail(email) != null) {
      const user = getUserByEmail(email)
    } else {
      const user = getUserByName(name)
    }
    
    if (user == null) {
      return done(null, false, { message: 'No user with that name or email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize