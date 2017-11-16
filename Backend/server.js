var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var express = require('express')
var mongoose = require('mongoose')
var app = express()

console.log("-Iniciando Server-")

var User = require('./models/user.js')

var posts = [
    { message: "Hello" },
    { message: "Hi" }
]

app.use(cors())
app.use(bodyParser.json())


app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/register', (req, res) => {
    var userData = req.body

    var user = new User(userData)

    user.save((err, result) => {
        if (err)
            console.log('error saving user')
        res.sendStatus(200)
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