const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    cost: {
        type: String,
        required:true
      },
    weight:{
        type:String,
        required:true
    },
    shipper:{
        type:String,
        required:true
    },
    recipient:{
        type:String,
        required:true
    },
    },  
    {timestamps:true}
);

module.exports = mongoose.model('Shipment', shipmentSchema);