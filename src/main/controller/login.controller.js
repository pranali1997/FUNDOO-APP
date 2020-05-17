const LOGIN_SERVICE = require('../service/login.service');
const SECRET_KEY = "itIsASecret";
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const verify=require('../verification/login.verify')



module.exports = {

    create(req, res) {
        if (!req.body.email) {
            return res.status(500).send({
                message: "problem while getting data from user in controller"
            });
        }

        const register = {
            name: req.body.name,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            password: bcrypt.hashSync(req.body.password),
            isPresent: req.body.isPresent
        };

        LOGIN_SERVICE.create(register, ((err, data) => {
            if (err) {
                res.status(500).send({
                    message: err.message || "problem while storing data in service"
                })
            }
            res.json(data);
        }))
    },

    findOne(req, res) {
        LOGIN_SERVICE.findOne({ email: req.body.email }, ((err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "problem occurred while getting data from database or from service"
                })
            }
          const stored_hash = req.body.password;
            verify.decodePassword(stored_hash, data.password, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "problem while getting decoded password"
                    })
                }
                else {
                    // verify.tokenGenerate(data, (err, data) => {
                    //     if (err) {
                    //         res.status(500).send({
                    //             message: err.message || "problem occurred while getting token from token function"
                    //         });
                    //     }
                        res.send("login successful..........")
                    }
                    // )
                }
            // }
            )
        }))
    },

    findToken(req, res) {
        JWT.verify(req.headers.token, SECRET_KEY, (err, data) => {
            if (err) {
                return res.status(500).send({
                    message: err.message || "problem while verifying secret key"
                });
            }
            else {
                var tokenValue = req.headers.token;
                var header = JWT.decode(tokenValue);
                LOGIN_SERVICE.findOne(header, userId, ((err, data) => {
                    if (err) {
                        return res.status(500).send({
                            message: err.message || "problem occurred while getting user info from database or service"
                        })
                    }
                    verify.tokenGenerate(data, (err, data) => {
                        if (err) {
                            return res.status(500).send({
                                message: err.message || "problem occurred while getting token from verify token"
                            })
                        }
                    })
                    res.send(data + "valid token..........")
                }))
            }
        })
    },

    findOneId(req,res){
        LOGIN_SERVICE.findOneId(req.body._id,((err,data)=>{
            if(err){
                return res.status(500).send({
                    message:err.message || "problem while getting id from database or service"
                })
            }
            verify.tokenGenerate(data,(err,data)=>{
                if(err){
                    return res.status(500).send({
                        message: err.message || "problem while getting generated token"
                    })
                }
                res.send(data+ "valid token..........")
            })
        }))
    }
}