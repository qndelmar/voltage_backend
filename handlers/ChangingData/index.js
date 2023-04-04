module.exports = function(app, jsonParser, Users){
    app.post('/ChangeDataInDatebase', jsonParser, async (req, res) => {
        const {name, surname, pseudoname, email} = req.body;
        Users.update({
                name, surname, pseudoname, email},
            {where: {email: req.body.email}}).then((result)=>{
            console.log(result);
            if(result[0] === 1){
                res.sendStatus(200);
            }
            else{
                console.log('a');
                res.sendStatus(500);
            }
        }).catch((e) => {
            res.status(404).send();
        })
    })
}