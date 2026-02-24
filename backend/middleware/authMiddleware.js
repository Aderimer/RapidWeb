require('dotenv').config();
const jsend = require('jsend');
const jwt = require('jsonwebtoken');


// Cookie verification
async function isUser(req, res, next) {
    const token = req.cookies.jwt;

    if (!token) {
        return res.jsend.fail('Not logged in')
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.jsend.error('Invalid or expired token, please log in again.')
    }

}

async function authMiddleware(req, res, next) {
    try {
        // TODO: Use getRole User service to check for Admin role
    } catch (error) {
        return res.jsend.fail({ statusCode: 500, message: 'No admin user found, please contact support.'})
    }
}

module.exports =  {isUser}