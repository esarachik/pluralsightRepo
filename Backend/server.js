var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var express = require('express')
var mongoose = require('mongoose')
var auth = require('./auth.js')
var app = express()

console.log("-Iniciando Server-")

var User = require('./models/user.js')
var Post = require('./models/post.js')

mongoose.Promise = Promise

app.use(cors())
app.use(bodyParser.json())

app.get('/posts/:id', async (req, res) => {
    var author = req.params.id
    var posts = await Post.find({ author })
    res.send(posts)
})

app.post('/post', (req, res) => {
    var postData = req.body
    postData.author = '5a0f349cb512db317c46fa02'
    var post = new Post(postData)
    post.save((err, result) => {
        if (err) {
            console.log('saving post error')
            return res.status(500).send({ message: 'saving post error' })
        }
        res.sendStatus(200)
    })
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

mongoose.connect(
    'mongodb://test:test@ds163745.mlab.com:63745/pssocial',
    { useMongoClient: true },
    (err) => {
        if (!err)
            console.log('-Connected to mongoDB-')
    })

app.use('/auth', auth)

app.listen(3000)

console.log("-Iniciado Server-")