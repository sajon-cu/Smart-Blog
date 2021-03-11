const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPostShema = new Schema({
    title: String,
    body: String,
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
})

const BlogPost = mongoose.model('BlogPost', BlogPostShema)

module.exports = BlogPost