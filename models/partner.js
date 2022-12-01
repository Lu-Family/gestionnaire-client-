const mongoose = require('mongoose')

const partnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },

    adresse: {
        type: String,
        required: true,
       
    }, 
    canton: {
        type: String,
        required: true,
       
    }, 

    contrat: [{
        BeginDate: {
            type: Date
        },
        price: {
            type: String
        },
        nl: {
            type: String
        },
        pa: {
            type: String
        },
        facebook: {
            type: String
        },
    }]


},{
    timestamps: { 
        createdAt: "created_at", 
        updatedAt: "updated_at" 
    }})

module.exports = mongoose.model('Partner', partnerSchema)