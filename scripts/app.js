
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
const userRoutes = require('./routes/user_routes.js')
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

app.use('/user', userRoutes)

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
                token: await uidgen.generate(), 
                password: crypted
            })
            const [deviceToken, sessionToken] = req.body.keep ? await keepUser(username) : null
            res.status(201).json({ message: 'Usuário criado!', User: {
                _id: user._id, 
                name: user.name, 
                lastname: user.lastname, 
                username: user.username, 
                fullname: user.fullname, 
                email: user.email, 
                userActivity: user.userActivity, 
                token: user.token, 
                session: {
                    deviceToken: deviceToken, 
                    sessionToken: sessionToken
                }
            } })
        }
    } catch(err) {
        res.sendStatus(500)
    }
})

async function keepUser(username, deviceToken) {
    if (!deviceToken) {
        var tokens = [await uidgen.generate(), await uidgen.generate()]
        await User.updateOne({ username: username }, {$push: { session: {
            deviceToken: tokens[0], 
            sessionToken: tokens[1]
        } }})
    } else {
        var tokens = await uidgen.generate()
        await User.updateOne({$and: [{ username: username }, { 'session.deviceToken': deviceToken }]}, {$set: {'session.$.sessionToken': tokens}})
    }
    return tokens
}

app.post('/api/user/login', async (req, res) => {
    const username = req.body.username
    if (req.body.deviceToken) {
        const deviceToken = req.body.deviceToken
        const user = await User.findOne({$and: [{ username: username }, { session: {$elemMatch: { deviceToken: deviceToken, sessionToken: req.body.sessionToken }} }]}).populate('userActivity')
        if (user) {
            const sessionToken = await keepUser(req.body.username, deviceToken)
            const userToken = await uidgen.generate()
            await User.updateOne({ username: username }, { token: userToken })
            res.status(200).json({ message: `Bem vindo de volta ${user.name}`, User: {
                _id: user._id, 
                name: user.name, 
                lastname: user.lastname, 
                username: user.username, 
                fullname: user.fullname, 
                email: user.email, 
                userActivity: user.userActivity, 
                token: userToken, 
                session: {
                    deviceToken: deviceToken, 
                    sessionToken: sessionToken
                }
            } })
        } else {
            res.status(401).json({ message: 'Erro de segurança' })
        }
    } else {
        const user = await User.findOne({$or: [ {username: username}, {email: username} ]}).populate('userActivity')
        if (user) {
            const password = req.body.password
            
            if (await bcrypt.compare(password, user.password)) {
                const [deviceToken, sessionToken] = req.body.keep ? await keepUser(req.body.username) : [null, null]
                const userToken = await uidgen.generate()
                await User.updateOne({ username: username }, { token: userToken })

                res.status(200).json({ message: 'Logado', User: {
                    _id: user._id, 
                    name: user.name, 
                    lastname: user.lastname, 
                    username: user.username, 
                    fullname: user.fullname, 
                    email: user.email, 
                    userActivity: user.userActivity, 
                    token: userToken, 
                    session: {
                        deviceToken: deviceToken, 
                        sessionToken: sessionToken
                    }
                } })
            } else {
                res.status(401).json({ message: 'Senha incorreta' })
            }
        } else {
            res.status(404).json({ message: 'Usuário não existe' })
        }
    }
})

app.put('/api/user/update/account-data/:id/:token', async (req, res) => {
    const id = req.params.id
    const has_user = await User.findOne({$and: [{ _id: id }, { token: req.params.token }]})

    if (has_user) {
        if (req.body.username) {
            if (await User.exists({$and: [{ _id: { $ne: id }}, { username: req.body.username }]})) res.status(409).json({ message: 'Nome de usuário já existente' })
        } else if (req.body.email) {
            if (await User.exists({$and: [{ _id: { $ne: id }}, { email: req.body.email }]})) res.status(409).json({ message: 'Email já existente' })
        }

        await User.updateOne({ _id: id }, req.body)

        const user = await User.findOne({ _id: id }).populate('userActivity')

        res.status(200).json({
            message: 'Dados atualizados', 
            User: user
        })
    } else {
        res.status(401).json({ message: 'Erro de segurança' })
    }
})

app.put('/api/user/update/password/:id/:token', async (req, res) => {
    const id = req.params.id
    const token = req.params.token
    const user = await User.findOne({$and: [{_id: id, token: token}] })

    if (user) {
        if (await bcrypt.compare(req.body.atualPassword, user.password)) {
            const crypted = await bcrypt.hash(req.body.newPassword, 10)
            await User.updateOne({ _id: id }, {
                password: crypted
            })
            res.status(200).json({ message: 'Senha alterada' })
        } else {
            res.status(401).json({ message: 'Senha incorreta' })
        }
    } else {
        res.status(401).json({ message: 'Erro de segurança' })
    }
})

app.put('/api/user/user-activity/update/:id/:token', async (req, res) => {
    const id = req.params.id
    const token = req.params.token
    const user = await User.exists({$and: [{_id: id, token: token}] })

    if (user) {
        await UserActivity.updateOne({ userId: id }, req.body)

        const data = await UserActivity.findOne({ userId: req.params.id })
        res.status(200).json(data)
    } else {
        res.sendStatus(401)
    }
})

const PORT = 1010

app.listen(PORT, () => {
    console.log('Servidor rodando!')
})
