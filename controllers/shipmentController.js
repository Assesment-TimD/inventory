const Shipment = require('../models/shipmentModel');
const loadShipment = async (req, res) => {
    const id = req.params.id;
    try {
      const shipment = await Shipment.find(id);
      res.render('admin/shipment/shipment_read', { user:req.session.user, shipment:shipment});
    } catch (err) {
      console.error('Kesalahan:', err);
      res.sendStatus(500);
    }
}

const createShipment = async (req, res) => {
    const id = req.params.id;
    try {
    const shipment = await Shipment.find(id);
      res.render('admin/shipment/create_shipment', { user:req.session.user, shipment:shipment});
    } catch (err) {
      console.error('Kesalahan:', err);
      res.sendStatus(500);
    }
  }
  const postShipment = async (req, res)=>{
    try{
        const { product, date, address, cost, weight, shipper, recipient} = req.body;
        const newPost = new Shipment({
            product, date, address, cost, weight, shipper, recipient
        });
    
        Shipment.insertMany([newPost])
        .then(() => {
          res.redirect('/admin/shipment');
        })
    } catch (error) {
        console.log(error.message);
        res.render('/admin/shipmet', { user: req.session.user, errorMessage: 'Failed to create data' });
    }
}

const updateShipment = async (req, res) =>{
    const id = req.params.id;
    try{
        const shipment = await Shipment.findById(id);
        res.render('admin/shipment/edit_shipment', {user: req.session.user, shipment:shipment });
    }
  
    catch (error){
        console.log(error.message);
    }
  }

  const postUpdateShipment = async (req, res) => {
    const id = req.params.id;
    const { product, date, address, cost, weight, shipper, recipient } = req.body;
    Shipment.findByIdAndUpdate(id, {product, date, address, cost, weight, shipper, recipient})
      .then(() => {
        res.redirect('/admin/shipment');
      })
      .catch(err => console.log(err));
  }

  const deleteShipment = async (req, res) => {
    const id = req.params.id;
    Shipment.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/admin/shipment');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
  }

module.exports={
    loadShipment,
    createShipment,
    postShipment,
    updateShipment,
    postUpdateShipment,
    deleteShipment
}