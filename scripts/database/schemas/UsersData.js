const mongoose = require('mongoose')

const UsersDataSchema = new mongoose.Schema({
    history: {
        calc: [{
            title: {
                type: String, 
                required: true
            }, 
            subtitle: {
                type: String, 
                required: true
            }, 
            link: {
                type: String, 
                required: true
            }, 
            result: {
                type: Array, 
                required: true
            }, 
            labels: {
                type: Array, 
                required: true
            }, 
            inputs: {
                type: Array, 
                required: true
            }
        }]
    }, 
    user: {
        type: mongoose.SchemaTypes.ObjectId, 
        required: true, 
        unique: true, 
        ref: 'Users'
    }
})

module.exports = mongoose.model('UsersData', UsersDataSchema)