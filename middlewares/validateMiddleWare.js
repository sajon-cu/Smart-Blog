const validateMiddleWare = (req, res, next) => {
    if(req.files == null || req.title == null || req.body == null) {
        return res.redirect('/post/new')
    }
    next()
}
module.exports = validateMiddleWare