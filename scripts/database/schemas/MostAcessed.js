const mongoose = require('mongoose')

const MostAcessedSchema = new mongoose.Schema({
    link: {
        type: String, 
        required: true
    }, 
    qtd: {
        type: Number, 
        required: true, 
        min: 0, 
        default: 1
    }, 
    title: {
        type: String
    }, 
    subtitle: {
        type: String
    }
})

MostAcessedSchema.pre('save', function (next) {
    const url = this.link.split('/').map((el) => el.replace(/-/g, ' '))
    this.title = url[1]
    this.subtitle = url[2]
    next()
})

module.exports = mongoose.model('MostAcessed', MostAcessedSchema)