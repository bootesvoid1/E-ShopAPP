const jwt = require('jsonwebtoken');
const checkLogin = (req, res, next) => {
    console.log(req.headers.authorization)
    const authHeader = req.headers.authorization;

    if (authHeader) {

        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({ error: "Token is not valid!",message : err.message})  ;
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ error: "You are not authenticated!" });
    }
};

const checkAuthorization = (allowedRoles) => {
    return (req, res, next) => {
        checkLogin(req, res, () => {
            if (allowedRoles.includes('admin') && req.user.isAdmin) {
                return next();
            }
            if (allowedRoles.includes('owner') && req.user.id === req.params.id) {
                return next();
            }

            return res.status(403).json({ error: 'Not allowed' });
        });
    };
};

  
  

module.exports = {
    checkLogin,
    checkAuthorization,
};
