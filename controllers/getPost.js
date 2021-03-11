const BlogPost = require('../models/BlogPost')

module.exports =  async (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
}