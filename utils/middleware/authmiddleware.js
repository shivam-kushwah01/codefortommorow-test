const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {

    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json("Unauthorized");
    }

    const decoded = jwt.verify(token, 'secretkey');

    console.log(decoded);

    req.userId = decoded.id;

    next();
}

module.exports = authMiddleware;