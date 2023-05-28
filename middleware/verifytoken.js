const jwt = require('jsonwebtoken');



module.exports.verifytoken = (req, res, next) => {

    const token = req.header('secret-key');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'secret-key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next();
    })
};

