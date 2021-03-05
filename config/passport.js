const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const Usuario = require('../models/Usuario')

module.exports = passport.use(new jwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY
}, (payload, done) => {
  Usuario.findById(payload._doc._id)
  .then(usuario => { 
    if(!usuario){
      return done(null, false)
    }else{
      return done(null, usuario)
    }
  })
  .catch(error => {
    return done(error, false)
  })
}))