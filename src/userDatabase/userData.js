const mongoose = require('mongoose');

const user_schema1 = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    psw:{
        type:String,
        required:true,
    }

})

const user_collection1 = new mongoose.model('users_collection1',user_schema1)

module.exports = user_collection1;