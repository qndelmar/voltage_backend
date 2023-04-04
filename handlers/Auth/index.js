const sequelize = require("../../index");
const jwt = require("jsonwebtoken");
const {tokenKey} = require("../../super-ultra-hyper-mega-secret/token");
const bcrypt = require("bcrypt");
const {salt} = require("../../super-ultra-hyper-mega-secret/salt");
const setJSONToken = require('../../scripts/setJson')
module.exports = function(app, jsonParser, Users){
    app.post('/GetAllUserData', jsonParser, async (req, res) => {
        console.log(sequelize);
        const token = req.headers.authorization.split(' ')[1];
        let userId = jwt.decode(token);
        try{
        await Users.findAll({where: {email: userId.login}}).then(userData => {
            if(userData[0]){
                let userObject = {
                    name: userData[0].name,
                    surname: userData[0].surname,
                    pseudoname: userData[0].pseudoname,
                    email: userData[0].email,
                    status: userData[0].status
                }
                res.status(200).json(userObject);
            }
        }).catch((e) => res.sendStatus(404))}catch (e) {
            res.sendStatus(404);
        }
    })
    app.post('/Validation', jsonParser, async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        try{
            jwt.verify(token, tokenKey);
            res.sendStatus(200);
        }catch (e) {
            res.sendStatus(400);
        }
    });
    app.post('/Auth', jsonParser, async (req, res)=> {
        console.log(req.body.password);
        const userData = {
            login: req.body.login,
            password: req.body.password,
            hashedPassword: bcrypt.hashSync(req.body.password, salt)
        }
        try{
        const currentUser = await Users.findAll({where: {email: userData.login, password: userData.hashedPassword}}).then((current)=>{
            if(current[0]){
                let token = setJSONToken(current[0].dataValues.email, current[0].dataValues.status, current[0].dataValues.id);
                res.status(200).json({token: token});
            }
            else{
                res.status(404).json("Not correct password or user not exist");
            }
        }).catch((e)=>{
            res.sendStatus(404);
        });
    }catch (e) {
            res.sendStatus(404)
        }})

}