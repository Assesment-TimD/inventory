const userController = require('../controllers/userController');
const productController = require('../controllers/productController');
const shipmentController = require('../controllers/shipmentController');
const auth = require('../middlewares/auth');

const express = require('express');
const user_route = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const { SESSION_SECRET }= process.env;
user_route.use(session({secret:SESSION_SECRET}))

user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

user_route.set('view engine', 'ejs');
user_route.set('views', './views');

user_route.use(express.static('public'));

user_route.get('/register', auth.isLogout, userController.registerLoad );
user_route.post('/register', userController.register );

user_route.get('/login', auth.isLogout, userController.loadLogin );
user_route.post('/login', userController.login );
user_route.get('/logout', auth.isLogin, userController.logout );

user_route.get('/admin/homepage', auth.isAdmin, auth.isLogin, userController.loadHomeAdmin );

user_route.get('/admin/data_user', auth.isAdmin, auth.isLogin, userController.loadDataUser);
user_route.get('/admin/create_user', auth.isAdmin, auth.isLogin, userController.createDataUser);
user_route.post('/createusers', auth.isAdmin, auth.isLogin, userController.postDataUser);
user_route.get('/delete_user/:id', auth.isAdmin, auth.isLogin, userController.deleteDataUser);
user_route.get('/update_user/:id', auth.isAdmin, auth.isLogin, userController.updateDataUser);
user_route.post('/update_users/:id', auth.isAdmin, auth.isLogin, userController.postUpdateDataUser);

user_route.get('/admin/product', auth.isAdmin, auth.isLogin, productController.loadProduct);
user_route.get('/admin/create_product', auth.isAdmin, auth.isLogin, productController.createProduct);
user_route.post('/createproducts', auth.isAdmin, auth.isLogin, productController.postProduct);
user_route.get('/update_product/:id', auth.isAdmin, auth.isLogin, productController.updateProduct);
user_route.post('/update_products/:id', auth.isAdmin, auth.isLogin, productController.postUpdateProduct);
user_route.get('/delete_product/:id', auth.isAdmin, auth.isLogin, productController.deleteProduct);

user_route.get('/admin/shipment', auth.isAdmin, auth.isLogin, shipmentController.loadShipment);
user_route.get('/admin/create_shipment', auth.isAdmin, auth.isLogin, shipmentController.createShipment);
user_route.post('/createshipments', auth.isAdmin, auth.isLogin, shipmentController.postShipment);
user_route.get('/update_shipment/:id', auth.isAdmin, auth.isLogin, shipmentController.updateShipment);
user_route.post('/update_shipments/:id', auth.isAdmin, auth.isLogin, shipmentController.postUpdateShipment);
user_route.get('/delete_shipment/:id', auth.isAdmin, auth.isLogin, shipmentController.deleteShipment);

user_route.get('/shipper/homepage', auth.isShipper, auth.isLogin, userController.loadHomeShipper );

user_route.get('/shipper/shipment', auth.isShipper, auth.isLogin, shipmentController.loadShipmentShipper);
user_route.get('/shipper/create_shipment', auth.isShipper, auth.isLogin, shipmentController.createShipmentShipper);
user_route.post('/shipper/createshipments', auth.isShipper, auth.isLogin, shipmentController.postShipmentShipper);
user_route.get('/shipper/update_shipment/:id', auth.isShipper, auth.isLogin, shipmentController.updateShipmentShipper);
user_route.post('/shipper/update_shipments/:id', auth.isShipper, auth.isLogin, shipmentController.postUpdateShipmentShipper);
user_route.get('/shipper/delete_shipment/:id', auth.isShipper, auth.isLogin, shipmentController.deleteShipmentShipper);



user_route.get('*', function(req, res){
    res.redirect('/login');
})
module.exports = user_route;