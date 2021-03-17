const User = require('../models/User')

module.exports = (req, res) => {
    console.log(req.body)
    User.create(req.body)
    res.redirect('/')
}