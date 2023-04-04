module.exports = function (app, jsonParser, TopDailyNews, OtherNews, Opinions){

    app.post('/DeletePost', jsonParser, async (req, res) => {
        if(req.body.category === 'Entertainment'){
            await OtherNews.destroy({where: {id: req.body.title}}).then((r) => {
                if(r === 0){
                    OtherNews.destroy({where: {name: req.body.title}}).then((result) => {
                        if(result){
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(500);
                        }
                    })
                }
                else{
                    res.sendStatus(200);
                }
            }).catch((r) => {
                if(!r){

                }
                else{
                    OtherNews.destroy({where: {name: req.body.title}}).then((result) => {
                        if(result){
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(500);
                        }
                    })
                }
            })
        }
        else if(req.body.category === 'HOT NEWS'){
            await TopDailyNews.destroy({where: {id: req.body.title}}).then((r)=>{
                if(r === 0){
                    TopDailyNews.destroy({where: {h1: req.body.title}}).then((result) => {
                        console.log(result);
                        if(result){
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(500);
                        }
                    })
                }
                else{
                    res.sendStatus(200);
                }
            }).catch((r) => {
                if(!r){
                    res.statusCode = 200;
                }
                else{
                    TopDailyNews.destroy({where: {h1: req.body.title}}).then((result) => {
                        console.log(result);
                        if(result){
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(500);
                        }
                    })
                }
            })
        }
        else if(req.body.category === 'Opinions'){
            await Opinions.destroy({where: {id: req.body.title}}).then((r)=>{
                if(r === 0){
                    Opinions.destroy({where: {name: req.body.title}}).then((result) => {
                        if(result){
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(500);
                        }
                    })
                }
                else{
                    res.sendStatus(200);
                }
            }).catch((r) => {
                if(!r){
                    res.statusCode = 200;
                }
                else{
                    Opinions.destroy({where: {name: req.body.title}}).then((result) => {
                        if(result){
                            res.sendStatus(200);
                        }
                        else{
                            res.sendStatus(500);
                        }
                    })
                }
            })
        }
    })
}