require('dotenv').config()
const User = require("../models/user");
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.Signup = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }

    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1) {
            res.status(409).json({
                mesaage: "Email already exists"
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) {
                    return res.status(500).json({
                        error: err
                    });
                }else {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    })
                    user.save()
                    .then(result => {
                        res.status(201).json({
                            message: "User created"
                        })
                    })
                    .catch(err => {
                            error: err
                        }
                    )
                }
            })
        }
    })
};

exports.login = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error: errors.array()[0].msg
        });
    }
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1){
            return res.status(401).json({
                message: "Email not found, user doesn\'t exist"
            })
        }
        bcrypt.compare(req.body.password, user[0].password, (err, response) => {
            if(err) {
                return res.status(401).json({
                    message: "Email not found, user doesn\'t exist"
                })  
            }
            if(response) {
                const token = jwt.sign({_id: user[0]._id}, process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: "Auth successfull",
                    token: token
                })
            }
            res.status(401).json({
                message: "Email not found, user doesn\'t exist"
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
};

exports.deleteUser = (req, res, next) => {
    User.deleteOne({_id: req.params.userId})
    .exec()
    .then(response => {
        res.status(200).json({
            message: "User deleted"
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
};