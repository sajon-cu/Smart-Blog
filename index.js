const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongose = require('mongoose')
const fileUpload = require('express-fileupload')

// middlewares 
const validateMiddleWare = require('./middlewares/validateMiddleWare')

// models
const BlogPost = require('./models/BlogPost')

// controllers
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const userLoginController = require('./controllers/loginUser')


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

// app.get('/about', (req, res) => {
//     //res.sendFile(path.resolve(__dirname, 'pages/about.html'))
//     res.render('about')
// })

// app.get('/contact', (req, res) => {
//     //res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
//     res.render('contact')
// })

// auth route
app.get('/auth/register', newUserController)
app.post('/users/register', storeUserController)
app.get('/auth/login', loginController)
app.post('/users/login', userLoginController)

app.get('/post/new', newPostController)

app.get('/post/:id', getPostController)

app.post('/posts/store', validateMiddleWare, storePostController)

app.get('/', homeController)