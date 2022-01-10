const mongoose = require('mongoose')
const UserData = require('./UsersData.js')

const UsersSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    }, 
    lastname: { 
        type: String, 
        required: true
    }, 
    username: {
        type: String, 
        required: true, 
        unique: true, 
    }, 
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    updatedAt: {
        type: Date, 
        default: () => new Date()
    }, 
    createdAt: {
        type: Date, 
        immutable: true, 
        required: true, 
        default: () => new Date()
    }
})

UsersSchema.post('save', async function() {
    await UserData.create({
        user: this._id
    })
})

UsersSchema.pre('update', function(next) {
    this.updatedAt = new Date()
    next()
})

module.exports = mongoose.model('Users', UsersSchema)