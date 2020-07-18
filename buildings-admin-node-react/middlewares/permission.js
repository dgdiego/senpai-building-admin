const { restart } = require("nodemon");

const apiAutentication = function (req, res, next) {
    //next();
    const isAutenticated = () => {
        if (req.url == '/login' || req.session.user != null) {
            return true;
        } else {
            return false
        }
    }
    
    if (isAutenticated()) {
        next();
    } else {
        res.status(401);
        res.json({
            status: 401,
            success: false,
            message: `Usuario no logueado`
        });
    }
};

const appAutentication = function (req, res, next) {
    //next();
    const isAutenticated = () => {
        if (req.url == '/' || req.url == '/login' || req.session.user != null) {
            return true;
        } else {
            return false
        }
    }
    
    if (req.url == '/login' && req.session.user != null) {
        return res.redirect('/home');
    }

    if (isAutenticated()) {
        next();
    } else {
        return res.redirect('/login');
    }

};

const apiUserCan = function (req, res, next) {
    const userCan = () => {
        var can = true;
        if (req.session.user) {
            if(req.session.user.isAdmin){
                can =  true;
            }else{
                if(req.url.includes('users')){
                    can = false;
                }
            }
        }
        return can;   
    }
    
    if (userCan()) {
        next();
    } else {
        res.status(403);
        res.json({
            status: 403,
            success: false,
            message: `No tiene los permisos necesarios para esta operación`
        });
    }
};

const appUserCan = function (req, res, next) {
    const userCan = () => {
        var can = true;
        if (req.session.user) {
            if(req.session.user.isAdmin){
                can =  true;
            }else{
                if(req.url.includes('users')){
                    can = false;
                }
            }
        }
        return can;   
    }
    
    if (userCan()) {
        next();
    } else {
        return res.redirect('/error/403');
    }
};

module.exports = {
    apiAutentication,
    appAutentication,
    apiUserCan,
    appUserCan
}