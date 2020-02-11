'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = authentication;

var _passportLocal = require('passport-local');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authentication(passport) {
    passport.use(new _passportLocal.Strategy({ usernameField: 'email' }, function (email, password, done) {
        //match email entered with the one in the database
        _User2.default.findOne({ email: email }).then(function (user) {
            if (!user) {
                return done(null, false, { message: "The email you entered isn't registered." });
            }

            //Match entered password with the one in the database
            _bcryptjs2.default.compare(password, user.password, function (err, isMatch) {
                if (err) {
                    throw err;
                }
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Incorrect email and password combination." });
                }
            });
        }).catch(function (err) {
            return console.log(err);
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        _User2.default.findById(id, function (err, user) {
            done(err, user);
        });
    });
}

//Model imports
//# sourceMappingURL=passport.js.map