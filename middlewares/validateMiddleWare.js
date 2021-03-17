const validateMiddleWare = (req, res, next) => {
    console.log(req.files)
    if(req.files == null || req.title === null || req.body === null) {
        console.log("null")
        return res.redirect('/post/new')
    }
    next()
}
module.exports = validateMiddleWare