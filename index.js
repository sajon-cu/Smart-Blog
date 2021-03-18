const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')

// middlewares 
const validateMiddleWare = require('./middlewares/validateMiddleWare')
const authMiddleWare = require('./middlewares/authMiddleWare')
const redirectIfAuthenticatedMiddleware = require('./middlewares/redirectIfAuthenticatedMiddleware')

// models
const BlogPost = require('./models/BlogPost')

// controllers
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const newPostController = require('./controllers/newPost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')

// auth controllers
const loginController = require('./controllers/login')
const userLoginController = require('./controllers/loginUser')
const logoutController = require('./controllers/lotout')


mongose.connect('mongodb://localhost/my_database', {
    useNewUrlParser: true
})

const app = express()

// using express-session
app.use(expressSession({
    secret: "jetpack"
}))

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
global.loggedIn = null;

app.use('*', (req, res, next) => {
    loggedIn = req.session.userId
    next()
})


// auth route
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', logoutController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, userLoginController)

app.get('/post/new', authMiddleWare, newPostController)

app.get('/post/:id', authMiddleWare, getPostController)

app.post('/posts/store', authMiddleWare, validateMiddleWare, storePostController)

app.get('/', homeController)