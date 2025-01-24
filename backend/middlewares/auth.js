const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, 'muneebjutt@123');
        req.user = verified;        
        next();
    } catch (error) {
        console.log(error.message);
        
        res.status(400).json({ error: 'Invalid token' });
    }
}

module.exports = authenticateToken;