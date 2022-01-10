
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/routes.js')
const path = require('path')
const User = require('./database/schemas/Users.js')
const MostAcessed = require('./database/schemas/MostAcessed.js')
const UserData = require('./database/schemas/UsersData.js')

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
    
        const message = {
            username: true, 
            email: true, 
            success: true
        }
    
        let error = false
        
        if (await User.exists({ username: username })) {
            message.username = false
            error = true
        }
        if (await User.exists({ email: email })) {
            message.email = false
            error = true
        }
        if (error) {
            message.success = false
            res.json(message)
            return
        }
        
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
        message.userData = await UserData.findOne({ user: user._id }).populate('user')
        res.json(message)
    } catch(err) {
        res.json({ error: err })
    }
})

app.post('/api/user/login', async (req, res) => {
    const username = req.body.username
    const user = await User.findOne({$or: [
        {username: username}, 
        {email: username}
    ]})
    if (user) {
        const password = req.body.password
        const compare = await bcrypt.compare(password, user.password)
        if (compare) {
            const data = await UserData.findOne({ user: user._id }).populate('user')
            console.log(data)
            res.send({ 
                problem: '', 
                success: true, 
                userData: data
            })
        }
        else res.send({ 
            problem: 'password', 
            success: false
        })
    } else {
        res.send({ 
            problem: 'user', 
            success: false
        })
    }
})

app.put('/api/user/update/:id', async (req, res) => {
    try {
        const userId = req.params.id
        const username = req.body.username
        const email = req.body.email
    
        const message = {
            username: true, 
            email: true, 
            success: true
        }
    
        let error = false
        
        if (await User.exists({$and: [{ _id: { $ne: userId }}, { username: username }]})) {
            message.username = false
            error = true
        }
        if (await User.exists({$and: [{ _id: { $ne: userId }}, { username: email }]})) {
            message.email = false
            error = true
        }
        if (error) {
            message.success = false
            res.json(message)
            return
        }
        
        const name = req.body.name
        const lastname = req.body.lastname

        const dataData = await User.findOne({ id: userId })
        console.log(dataData)
        await User.updateOne({ _id: userId }, {
            name: name, 
            lastname: lastname, 
            username: username,
            email: email
        })
        message.userData = await UserData.findOne({ user: userId }).populate('user')
        res.json(message)
    } catch(err) {
        console.log(err.message)
        res.json({ error: err })
    }
})

app.put('/api/user/user-data/update/:id', async (req, res) => {
    await UserData.updateOne({ user: req.params.id }, req.body)
    const data = await UserData.findOne({ user: req.params.id }).populate('user')
    res.json(data)
})

const PORT = 1010

app.listen(PORT, () => {
    console.log('Servidor rodando!')
})
