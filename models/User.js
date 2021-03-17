const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    username: String,
    email: String,
    phone: String,
    password: String
})

UserSchema.pre('save', function(next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash
        next()
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = User