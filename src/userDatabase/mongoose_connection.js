const mongoose = require('mongoose')

// const user_collection1 = require('./userData')
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/myuserdata')
.then(()=>{
    console.log('Mongoose connection sucessfull...')
}).catch((err)=>{
    console.log(err)
})