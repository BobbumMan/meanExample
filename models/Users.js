var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true},
  email: String,
  bio: String,
  image: String,
  following: [String],
  hash: String,
  salt: String
});

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
}

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60)

  return jwt.sign({
    _id: this._id,
    username: this.username,
    email: this.email,
    bio: this.bio,
    image: this.image,
    exp: parseInt(exp.getTime() / 1000),
  }, 'SECRET');

}

mongoose.model('User', UserSchema);
