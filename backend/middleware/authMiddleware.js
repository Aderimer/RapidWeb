require('dotenv').config();
const jsend = require('jsend');
const jwt = require('jsonwebtoken');

const db = require('../models');
const UserService = require('../services/UserService');
const userService = new UserService(db);


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

async function isAdmin(req, res, next) {
    try {
        const token = req.cookies.jwt;

        if(!token) {
            return res.jsend.fail('Token missing')
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if(decoded.role === 'Admin') {
            req.user = decoded;
            next();
        } else {
            return res.jsend.fail({ statusCode: 401, message: 'You are not authorized to access this.'})
        }

    } catch (error) {
        return res.jsend.fail({ statusCode: 500, message: 'No admin user found, please contact support.'})
    }
}

module.exports =  {isUser, isAdmin}