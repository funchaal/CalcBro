
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const UIDGenerator = require('uid-generator')
const uidgen = new UIDGenerator(256)
const nodemailer = require('nodemailer')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/routes.js')
const path = require('path')
const User = require('./database/schemas/Users.js')
const MostAcessed = require('./database/schemas/MostAcessed.js')
const UserActivity = require('./database/schemas/UserActivities.js')

mongoose.connect('mongodb://localhost:27017/calcbro').then(() => console.log('o mongo ta bao'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

app.post('/statistics/MostAcessed', async (req, res) => {
    const link = req.body.link
    if (await MostAcessed.exists({ link: link })) {
        await MostAcessed.updateOne({ link: link }, {$inc: { qtd: 1 }})
    } else {
        await MostAcessed.create({ link: link })
    }
})

app.get('/statistics/MostAcessed', async (req, res) => {
    const data = await MostAcessed.find()
    res.json(data)
})

app.use('/', routes)

app.post('/api/user/new', async (req, res) => {
    try {
        const username = req.body.username
        const email = req.body.email

        const problem = []
        
        if (await User.exists({ username: username })) problem.push('username')
        if (await User.exists({ email: email })) problem.push('email')

        if (problem.length > 0) {
            let message = ''
            if (problem.length > 1) message = 'Usuário e email já existem'
            else if (problem[0] === 'username') message = 'Usuário já existe'
            else if (problem[0] === 'email') message = 'Email já existe'

            res.status(409).json({ message: message })
        } else {
            const name = req.body.name
            const lastname = req.body.lastname
            const password = req.body.password
            
            const crypted = await bcrypt.hash(password, 10)
            const user = await User.create({
                name: name, 
                lastname: lastname, 
                username: username,
                email: email, 
                password: crypted
            })
            const token = req.body.keep ? await keepUser(username) : null
            res.status(201).json({ message: 'Usuário criado!', User: {
                _id: user._id, 
                name: user.name, 
                lastname: user.lastname, 
                username: user.username, 
                fullname: user.fullname, 
                email: user.email, 
                userActivity: user.userActivity, 
                token: token
            } })
        }
    } catch(err) {
        console.log(err.message)
        res.sendStatus(500)
    }
})

async function keepUser(username) {
    const token = await uidgen.generate()
    await User.updateOne({ username: username }, { token: token })
    return token
}

app.post('/api/user/login', async (req, res) => {
    const username = req.body.username
    if (req.body.token) {
        const user = await User.findOne({$and: [{ username: username }, { token: req.body.token }]}).populate('userActivity')
        const token = await keepUser(req.body.username)
        res.status(200).json({ message: `Bem vindo de volta ${user.name}`, User: {
            _id: user._id, 
            name: user.name, 
            lastname: user.lastname, 
            username: user.username, 
            fullname: user.fullname, 
            email: user.email, 
            userActivity: user.userActivity, 
            token: token
        } })
    } else {
        const user = await User.findOne({$or: [ {username: username}, {email: username} ]}).populate('userActivity')
        if (user) {
            const token = req.body.keep ? await keepUser(req.body.username) : null
            const password = req.body.password
            
            if (await bcrypt.compare(password, user.password)) {
                res.status(200).json({ message: 'Logado', User: {
                    _id: user._id, 
                    name: user.name, 
                    lastname: user.lastname, 
                    username: user.username, 
                    fullname: user.fullname, 
                    email: user.email, 
                    userActivity: user.userActivity, 
                    token: token
                } })
            } else {
                res.status(401).json({ message: 'Senha incorreta' })
            }
        } else {
            res.status(404).json({ message: 'Usuário não existe' })
        }
    }
})

app.put('/api/user/update/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const username = req.body.username
        const email = req.body.email
    
        const message = {
            success: false, 
            problem: []
        }
        
        if (await User.exists({$and: [{ _id: { $ne: userId }}, { username: username }]})) message.problem.push('username')
        if (await User.exists({$and: [{ _id: { $ne: userId }}, { username: email }]})) message.problem.push('email')
        
        if (message.problem.length > 0) {
            res.json(message)
        } else {
            const name = req.body.name
            const lastname = req.body.lastname
    
            await User.updateOne({ _id: userId }, {
                name: name, 
                lastname: lastname, 
                username: username,
                email: email
            })
            
            message.UserActivity = await UserActivity.findOne({ user: userId }).populate('user')
            res.json(message)
        }
    } catch(err) {
        res.sendStatus(500)
    }
})

app.put('/api/user/userActivity/update/:id', async (req, res) => {
    console.log(req.params.id)
    await UserActivity.updateOne({ userId: req.params.id }, req.body)
    const data = await UserActivity.findOne({ userId: req.params.id })
    res.status(200).json(data)
})

const PORT = 1010

app.listen(PORT, () => {
    console.log('Servidor rodando!')
})
