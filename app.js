require('dotenv').config();

var mongoose = require('mongoose');

const app = require('express')();

const http = require('http').Server(app);

const userRoute = require('./routes/userRoute');;

app.use('/', userRoute);

mongoose.connect('mongodb+srv://fayudhi:w0nderKiD@management-inventory.hlsfgkk.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to mongodb')
}).catch((error)=>{
    console.log(error)
})

http.listen(3000, function(){
    console.log('port connected')
});