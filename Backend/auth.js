var User = require('./models/user.js')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jwt-simple')
var express = require('express')
var router = express.Router()

router.post('/register', (req, res) => {
    var userData = req.body

    var user = new User(userData)

    user.save((err, newUser) => {
        debugger;
        if (err)
            return res.status(500).send({ message: "Email saving user" })
            createSaveToken(res, newUser)
    })
})

router.post('/login', async (req, res) => {
    var loginData = req.body
    var user = await User.findOne({ email: loginData.email })
    if (!user)
        return res.status(401).send({ message: "Email or Password invalid" })

    bcrypt.compare(loginData.pwd, user.pwd, (err, isMatch) => {
        if (!isMatch)
            return res.status(401).send({ message: "Email or Password invalid" })
        createSaveToken(res, user)
    })
})

function createSaveToken(res, user){
    var payload = { sub: user._id }
    var token = jwt.encode(payload, '123')
    res.status(200).send({ token })
}

var auth = {
    router,
    checkAuthenticated: (req, res, next) => {
        console.log(req.header('authorization'))
        if (!req.header('authorization'))
            return res.status(401).send({ message: "Unauthorized. Missing Auth header" })

        var token = req.header('authorization').split(' ')[1]
        var payload = jwt.decode(token, '123')

        if (!payload)
            return res.status(401).send({ message: "Unauthorized. Auth header invalid" })

        req.userId = payload.sub
        next()
    }
}

module.exports = auth