const mongoose = require('mongoose')
const UserActivity = require('./UserActivities.js')

const UsersSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
        trim: true
    }, 
    lastname: { 
        type: String, 
        required: true, 
        trim: true
    }, 
    username: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true
    }, 
    password: {
        type: String, 
        required: true
    }, 
    userActivity: {
        type: mongoose.SchemaTypes.ObjectId, 
        unique: true, 
        immutable: true, 
        ref: 'UserActivities'
    }, 
    createdAt: {
        type: Date, 
        immutable: true, 
        required: true, 
        default: () => new Date()
    }, 
    token: {
        type: String, 
        default: null
    }, 
    session: [{
        deviceToken: {
            type: String, 
        }, 
        sessionToken: {
            type: String
        }
    }] 
})

UsersSchema.pre('save', async function() {
    const data = await UserActivity.create({ userId: this._id })
    this.userActivity = data
})

UsersSchema.pre('deleteOne', async function() {
    await UserActivity.deleteOne({ _id: this._id })
})

module.exports = mongoose.model('Users', UsersSchema)