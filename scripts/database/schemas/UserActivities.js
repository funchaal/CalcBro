const mongoose = require('mongoose')

const UserActivitiesSchema = new mongoose.Schema({
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
    userId: {
        type: mongoose.SchemaTypes.ObjectId, 
        required: true, 
        unique: true, 
    }
})

module.exports = mongoose.model('UserActivities', UserActivitiesSchema)