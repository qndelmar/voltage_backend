module.exports = function(app, jsonParser, Opinions, OtherNews, TopDailyNews){
    app.post('/GetOpinions', jsonParser, async (req, res) => {
        const posts = await Opinions.findAll().catch((e) => {
            res.status(500).send();
        });
        res.status(200).json(posts.slice(0, 7));
    })
    app.post('/GetEntertain', jsonParser, async (req, res) => {
        const posts = await OtherNews.findAll({where: {category: 2}}).catch((e) => {
            res.status(500).send();
        });
        res.status(200).json(posts.slice(0, 3));
    })
    app.post('/GetParts', jsonParser, async (req, res) => {
        console.log(req.body);
        if(req.body.category === 0){
            Opinions.findAll().then((el)=>{
                if(el[0]){
                    res.status(200).send(el.slice(req.body.id, req.body.id+20));
                }
                else{
                    res.status(404).send();
                }
            }).catch((e) => {
                res.status(500).send();
            });
        }
        else if(req.body.category === 1){
            OtherNews.findAll().then((el)=>{
                if(el[0]){
                    res.send(el.slice(req.body.id, req.body.id+20));
                }
                else{
                    res.status(404).send();
                }
            }).catch((e) => {
                res.status(500).send();
            });
        }
        else{
            TopDailyNews.findAll().then((el)=>{
                if(el[0]){
                    res.send(el.slice(req.body.id, req.body.id+20));
                }
                else{
                    res.status(404).send();
                }
            }).catch((e) => {
                res.status(500).send();
            })
        }
    })

}