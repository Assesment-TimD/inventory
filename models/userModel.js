const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    tlp:{
        type:String,
        required:true
    },
    alamat:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['admin','shipper'],
        required: true,
      }
    },  
    {timestamps:true}
);

module.exports = mongoose.model('User', userSchema);