require('dotenv').config();
var express = require("express");
var passport = require("passport");
var jsend = require("jsend");
var jwt = require("jsonwebtoken");
var LocalStrategy = require("passport-local");
var crypto = require("crypto");
var { isUser } = require('../middleware/authMiddleware')
var db = require("../models");
var UserService = require("../services/UserService");
var userService = new UserService(db);

passport.use(
  new LocalStrategy(function verify(username, password, cb) {
    userService.getUserByEmail(username).then((data) => {
      if (data === null) {
        return cb(null, false, { message: "Incorrect username or password." });
      }
      crypto.pbkdf2(
        password,
        data.salt,
        310000,
        32,
        "sha256",
        function (err, hashedPassword) {
          if (err) {
            return cb(err);
          }
          if (!crypto.timingSafeEqual(data.encryptedPassword, hashedPassword)) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }
          return cb(null, data);
        },
      );
    });
  }),
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

var router = express.Router();
router.use(jsend.middleware);

router.post("/logout", isUser, function (req, res, next) {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/'
  })
  res.jsend.success('Logout successful')
});

router.post("/signup", async function (req, res, next) {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.username
  ) {
    return res.jsend.fail({
      statusCode: 400,
      message: "All fields are required.",
    });
  }
  const existingUser = await userService.getUserByEmail(req.body.email);
  if (existingUser) {
    return res.jsend.fail({
      statusCode: 400,
      message: "A user with that email already exists.",
    });
  }
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(
    req.body.password,
    salt,
    310000,
    32,
    "sha256",
    async function (err, hashedPassword) {
      if (err) {
        return next(err);
      }
      const createdUser = await userService.createUser(
        req.body.username,
        req.body.email,
        hashedPassword,
        salt,
      );
      res.jsend.success({statusCode: 200,  newUser: createdUser.username });
    },
  );
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  if (email == null) {
    return res.jsend.fail({ statusCode: 400, email: "Email is required." });
  }
  if (password == null) {
    return res.jsend.fail({
      statusCode: 400,
      password: "Password is required.",
    });
  }
  userService.getUserByEmail(email).then((data) => {
    if (data === null) {
      return res.jsend.fail({ result: "Incorrect email or password." });
    }
    crypto.pbkdf2(
      password,
      data.salt,
      310000,
      32,
      "sha256",
      function (err, hashedPassword) {
        if (err) {
          return next(err);
        }
        if (!crypto.timingSafeEqual(data.encryptedPassword, hashedPassword)) {
          return res.jsend.fail({ result: "Incorrect email or password." });
        }
        let token;
        try {
          token = jwt.sign(
            { id: data.id, email: data.email },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" },

            
          );

          // Cookie
            res.cookie('jwt', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production', // Force https in production
              sameSite: 'strict',
              maxAge: 3600000, // 1 hour
              path: '/'
            })
        } catch (err) {
          res.jsend.fail("Something went wrong with creating JWT token.");
        }
        res.jsend.success({
          statusCode: 200,
          result: "You are now logged in.",
          id: data.id,
          email: data.email,
          token: token,
        });
      },
    );
  });
});

router.get('/all', async (req, res) => {
  const users = await userService.getAllUsers();

  res.json({"users": users})
})

router.get("/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    if (!isNaN(userId)) {
      const user = await userService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else {
      res.status(400).json({ message: "Invalid user ID format" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
});

module.exports = router;