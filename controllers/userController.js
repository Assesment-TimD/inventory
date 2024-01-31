const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const  registerLoad = async (req, res) => {

    try{
        res.render('register')
    } catch (error) {
        console.log(error.message);
    }

}

const register = async (req, res)=>{
    try{
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const user = new User ({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            tlp: req.body.tlp,
            alamat: req.body.alamat,
            password: passwordHash,
            role : req.body.role,
        });
        await user.save();

        res.render('login', {message: 'register successfully'})
    } catch (error) {
        console.log(error.message);
    }
}

const loadLogin = async (req, res) =>{
    try{
        res.render('login');
    }

    catch (error){
        console.log(error.message);
    }
}

const login = async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        const userData = await User.findOne({ username: username }).populate('role');
        if (userData) {
         const passwordMatche = await bcrypt.compare(password, userData.password);
                if(passwordMatche){
                    req.session.user = userData;
                    if (userData.role === 'admin') {
                        res.redirect('/admin/homepage');
                    } else if (userData.role === "shipper") {
                        res.redirect('/shipper/homepage');
                    }       
                    return;
                }
                else{
                    res.render('login', {message:'Email dan password salah'})
                }
        }
        else{
            res.render('login', {message:'Oops, email dan password anda salah'})
        }
    


    } catch (error){
        res.render('login', {message:'Cek kembali email dan password anda'})
    }
}

const logout = async (req, res) =>{
    try{
        req.session.destroy();
        res.redirect('/');
    }

    catch (error){
        console.log(error.message);
    }
}

const loadHomeAdmin = async (req, res) =>{
    try{
        res.render('admin/homepage', {user: req.session.user});
    }

    catch (error){
        console.log(error.message);
    }
}

const loadDataUser = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await User.find(id);
      res.render('admin/data_user/read_user', { users:req.session.user, user:user});
    } catch (err) {
      console.error('Kesalahan:', err);
      res.sendStatus(500);
    }
  }

  const createDataUser = async (req, res) =>{
    try{
        res.render('admin/data_user/create_user', {user: req.session.user})
    }

    catch (error){
        console.log(error.message);
    }
}

  const postDataUser = async (req, res)=>{
    try{
        const { username, name, email, tlp, alamat, password, role} = req.body;
        const newPost = new User({
            username, name, email, tlp, alamat, password, role
        });
    
        User.insertMany([newPost])
        .then(() => {
          res.redirect('/admin/data_user');
        })
    } catch (error) {
        console.log(error.message);
        res.render('admin/data_user/create_user', { user: req.session.user, errorMessage: 'Failed to create data' });
    }
}

const updateDataUser = async (req, res) => {
    const id = req.params.id;
    try{
        const users = await User.findById({ _id: id });
        res.render('admin/data_user/edit_user',{user: req.session.user, users:users });
    }catch{
        (err => console.log(err));
  }
}

 const postUpdateDataUser = async (req, res) => {
    const id = req.params.id;
    const { username, name, email,tlp, alamat, role } = req.body;
    User.findByIdAndUpdate(id, { username, name, email, tlp, role, alamat})
      .then(() => {
        res.redirect('/admin/data_user');
      })
      .catch(err => console.log(err));
  }

  const deleteDataUser = async (req, res) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/admin/data_user');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
  }


  const loadHomeShipper = async (req, res) =>{
    try{
        res.render('shipper/homepage', {user: req.session.user});
    }

    catch (error){
        console.log(error.message);
    }
}

module.exports = {
    registerLoad,
    register,
    loadLogin,
    login,
    logout,
    loadHomeAdmin,
    loadDataUser,
    createDataUser,
    postDataUser,
    updateDataUser,
    postUpdateDataUser,
    deleteDataUser,
    loadHomeShipper
}