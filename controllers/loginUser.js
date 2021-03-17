const User = require('../models/User')
const bycript = require('bcrypt')

module.exports = (req, res) => {
    const {username, password} = req.body
    User.findOne({username: username}, (error, user) => {
        if(user) {
            bycript.compare(password, user.password, (error, same) => {
                if(same) {
                    res.redirect('/')
                } else {
                    res.redirect('/auth/login')
                }
            })
        } else {
            res.redirect('/auth/login')
        }
    })
}