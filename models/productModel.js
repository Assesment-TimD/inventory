const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product:{
        type:String,
        required:true
    },
    category:{
        type: String,
        enum: ['elektronik','kontruksi', 'textile', 'otomotif', 'alat_berat', 'kesehatan', 'pertanian']
    },
    price:{
        type:String,
        required:true
    },
    qty:{
        type:String,
        required:true
    },
    status: {
        type: String,
        enum: ['available','notavailable', 'on_hold'],
      },
    brand:{
        type:String,
        required:true
    },
    supplier:{
        type:String,
        required:true
    },
    },  
    {timestamps:true}
);

module.exports = mongoose.model('Product', productSchema);