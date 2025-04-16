const mongoose = require('mongoose');
const teamSchema = new mongoose.Schema({
    name: {
        type: "String",
        required:true
    },
    coach: {
        type: "String",
        required:true
    },
    players: [ {
        name: {
            type: "String",
            required:true
        },
        position: {
            type: "String",
            required:true
        },
        number: {
            type:"Number"
        },
        goals: {
            type:"Number"
        },
        assists: {
            type:"Number"
        },
        yellowcards: {
            type:"Number"
        },
        redcards: {
            type:"Number"
        },
        
    }],
    logo: {
        type:"String"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    }


})
module.exports = mongoose.model("Team", teamSchema)
