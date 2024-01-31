const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
      return next();
    } else {
      res.redirect('/login'); // atau sesuaikan dengan rute login admin
    }
  };
  
  const isShipper = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'shipper') {
      return next();
    } else {
      res.redirect('/login'); // atau sesuaikan dengan rute login mahasiswa
    }
  };

const isLogin = async (req, res, next)=>{
    try{
        if(req.session.user){

        }else{
            res.redirect('/');
        }
        next();
    }catch{

    }
}


const isLogout = async (req, res, next)=>{
    try{
        if(req.session.user){
            res.redirect('/admin/homepage')
        }
        next();
    }catch{

    }
}

module.exports = {
    isShipper,
    isAdmin,
    isLogin,
    isLogout
}