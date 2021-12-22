
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/routes.js')
const path = require('path')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const most_acessed_db = []

app.post('/statistics', (req, res) => {
    const link = req.body.mostAcessed.link
    if (most_acessed_db.some((el) => el.link === link)) {
        most_acessed_db.forEach((el) => {
            if (el.link === link) {
                el.qtd = el.qtd + 1
            }
        })
        most_acessed_db.sort((a, b) => b.qtd - a.qtd)
    } else {
        const url = link.split('/').map((el) => el.replace(/-/g, ' '))
        most_acessed_db.push({ 
            link: link, 
            qtd: 1, 
            title: url[1], 
            subtitle: url[2]
        })
    }
})

app.get('/statistics', (req, res) => {
    res.send(most_acessed_db)
})

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

const PORT = 1010

app.listen(PORT, () => {
    console.log('Servidor rodando!')
})
