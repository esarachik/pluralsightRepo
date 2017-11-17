var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var express = require('express')
var jwt = require('jwt-simple')
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var app = express()

console.log("-Iniciando Server-")

var User = require('./models/user.js')

mongoose.Promise = Promise

var posts = [
    { message: "Hello" },
    { message: "Hi" }
]

app.use(cors())
app.use(bodyParser.json())


app.get('/posts', (req, res) => {
    res.send(posts)
})
app.get('/users', async (req, res) => {
    try {
        var users = await User.find({}, '-pwd -__v')
        res.send(users)
    }
    catch (error) {
        console.error(error)
        res.sendStatus(500)
    }

})
app.get('/profile/:id', async (req, res) => {
    try {
        var user = await User.findById(req.params.id, '-pwd -__v')
        res.send(user)
    }
    catch (error) {
        console.error(error)
        res.sendStatus(500)
    }

}) 

app.post('/register', (req, res) => {
    var userData = req.body

    var user = new User(userData)

    user.save((err, result) => {
        debugger;
        if (err)
            console.log('error saving user', err)
        res.sendStatus(200)
    })
})

app.post('/login', async (req, res) => {
    var loginData = req.body
    var user = await User.findOne({ email: loginData.email })
    if (!user)
        return res.status(401).send({ message: "Email or Password invalid" })
    
    bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
        if (!isMatch)
            return res.status(401).send({ message: "Email or Password invalid" })
        var payload = {}
        var token = jwt.encode(payload, '123')
        res.status(200).send({ token })
    })    
})
mongoose.connect(
    'mongodb://test:test@ds163745.mlab.com:63745/pssocial',
    { useMongoClient: true },
    (err) => {
        if (!err)
            console.log('-Connected to mongoDB-')
    })
app.listen(3000)

console.log("-Iniciado Server-")