const jwt = require('jsonwebtoken');

exports.auth = async (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('No token, Authorization denied!')
    try {
        const decoded = await jwt.verify(token, 'jwtSecret')
        req.user = decoded
        next();
    } catch (err) {
        res.status(401).send("Token is not valid!")
    }
}


exports.manager = async (req, res, next) => {
    const { role } = req.user;
    if (role !== 2) return res.status(403).send('Admin access denied!')
    next();
}