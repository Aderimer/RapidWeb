require('dotenv').config();
const jsend = require('jsend');
const jwt = require('jsonwebtoken');

const db = require('../models');
const UserService = require('../services/UserService');
const userService = new UserService(db);



async function getUserData(req, res, next) {
    try {
        if (!req.cookies.jwt) {
            req.userData = null;
            return next();
        }
        const decoded = jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET);
        const userData = await userService.getUserById(decoded.id);
        req.userData = userData ? { id: userData.id, email: userData.email, role: userData.role } : null;
        next();
    } catch (error) {
        return res.jsend.error('Failed to retrieve user data, please try again later.')
    }
}
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

module.exports =  {isUser, isAdmin, getUserData}