const Product = require('../models/productModel');
const loadProduct = async (req, res) => {
    const id = req.params.id;
    try {
      const product = await Product.find(id);
      res.render('admin/product/read_product', { user:req.session.user, product:product});
    } catch (err) {
      console.error('Kesalahan:', err);
      res.sendStatus(500);
    }
}

const createProduct = async (req, res) => {
    const id = req.params.id;
    try {
    const product = await Product.find(id);
      res.render('admin/product/create_product', { user:req.session.user, product:product});
    } catch (err) {
      console.error('Kesalahan:', err);
      res.sendStatus(500);
    }
  }

const postProduct = async (req, res)=>{
    try{
        const { product, category, price, qty, status, brand, supplier} = req.body;
        const newPost = new Product({
            product, category, price, qty, status, brand, supplier
        });
    
        Product.insertMany([newPost])
        .then(() => {
          res.redirect('/admin/product');
        })
    } catch (error) {
        console.log(error.message);
        res.render('/admin/product', { user: req.session.user, errorMessage: 'Failed to create data' });
    }
}

const updateProduct = async (req, res) =>{
    const id = req.params.id;
    try{
        const product = await Product.findById(id);
        res.render('admin/product/edit_product', {user: req.session.user, product:product });
    }
  
    catch (error){
        console.log(error.message);
    }
  }

  const postUpdateProduct = async (req, res) => {
    const id = req.params.id;
    const { product, category, price, qty, status, brand, supplier } = req.body;
    Product.findByIdAndUpdate(id, {product, category, price, qty, status, brand, supplier})
      .then(() => {
        res.redirect('/admin/product');
      })
      .catch(err => console.log(err));
  }

  const deleteProduct = async (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/admin/product');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
  }

module.exports = {
    loadProduct,
    createProduct,
    postProduct,
    updateProduct,
    postUpdateProduct,
    deleteProduct
}