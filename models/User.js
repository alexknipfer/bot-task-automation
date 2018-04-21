const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
})

module.exports = mongoose.model('User', UserSchema)
