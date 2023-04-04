const bcrypt = require("bcrypt");
const {salt} = require("../../super-ultra-hyper-mega-secret/salt");
const setJSONToken = require("../../scripts/setJson");
module.exports = function(app, jsonParser, Users){

    let addNewUser =  async (newUserObject) => {
        let value = 0;
        await Users.findAll({where: {email: newUserObject.email}}).then(async (res)=>{
            if(res[0]){
                value = -1;
            }
            else{
                let user = Users.build({name: newUserObject.name, surname: newUserObject.surname, pseudoname: newUserObject.pseudoname,
                    email: newUserObject.email, password: newUserObject.password, status: newUserObject.status, birthdate: '0', otherData: 'null'});
                await user.save();
                await Users.findAll({where: {email: newUserObject.email}}).then((current)=>{
                    value = current[0].dataValues.id;
                })
            }
        })
        return value;
    }

    app.post('/Register', jsonParser, async (req, res) => {
        const newUser = {
            name: req.body.name,
            surname: req.body.surName,
            pseudoname: req.body.nick,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, salt),
            status: 0,
            birthdate: req.body.birthdate
        }
        let value = await addNewUser(newUser).catch((e) => {
            res.status(500).send();
        });
        if(value !== -1){
            let token = setJSONToken(newUser.email, newUser.status, value)
            res.status(200).json({token: token});
        }
        else{
            res.sendStatus(400);
        }
    })
}
