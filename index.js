const express = require('express')
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongose = require('mongoose')
const fileUpload = require('express-fileupload')

// middlewares 
const validateMiddleWare = require('./middlewares/validateMiddleWare')

// models
const BlogPost = require('./models/BlogPost')

mongose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true
})

const app = express()

// using express-fileupload
app.use(fileUpload())

// using body-parser to pase data from request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// set templating engine
app.set('view engine', 'ejs')

// set static path to use resources
app.use(express.static('public'))

app.listen(3000, (req, res) => {
    console.log('App listening on port 3000')
})

app.get('/about', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about')
})

app.get('/contact', (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact')
})

app.get('/post/new', (req, res) => {
    res.render('create')
})

app.get('/post/:id', async (req, res) => {
    //res.sendFile(path.resolve(__dirname, 'pages/post.html'))
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
})

app.post('/posts/store', validateMiddleWare, async(req, res) => {
    let image = req.files.image
    image.mv(path.resolve(__dirname, 'public/img', image.name), async(error) => {
        await BlogPost.create({
            ...req.body,
            image: '/img/'+image.name
        })
        res.redirect('/')
    })
})

app.get('/', async(req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})