module.exports = function(app, jsonParser, OtherNews, Opinions, TopDailyNews, Comments, ArticleContents, Users){
    app.post('/GetPost', jsonParser, async (req, res)=>{
        try{
            Opinions.findAll({where: {id: req.body.id}, include: {
                    model: ArticleContents,
                    attributes: ['content']
                }
            }).then((el)=>{
                Comments.findAll({where: {OpinionId: req.body.id}}).then(async (elements) => {
                    let commentsArray = []
                    let arr = await Promise.all(elements.map(async (i)=>{
                        await Users.findByPk(i.dataValues.UserId).then((e)=>{
                            i.dataValues.UserId = e.dataValues.pseudoname;
                        })
                        return i;
                    }))
                    for await (let resolvedPromise of arr) {
                        commentsArray.push(resolvedPromise);
                    }
                    if(el[0] && arr){
                        res.send({text: el[0].dataValues.ArticleContent.dataValues.content, comments: arr})
                    }
                    else{
                        res.sendStatus(404);
                    }
                })

            })
        }
        catch (e) {
            res.status(404).send();
        }
    })
    app.post('/GetDaily', jsonParser, async (req, res)=>{
        try{
            TopDailyNews.findAll({where: {id: req.body.id}}).then((el)=>{
                Comments.findAll({where: {TopDailyId: req.body.id}}).then(async (elements) => {
                    let commentsArray = []
                    let arr = await Promise.all(elements.map(async (i)=>{
                        await Users.findByPk(i.dataValues.UserId).then((e)=>{
                            i.dataValues.UserId = e.dataValues.pseudoname;
                        })
                        return i;
                    }))
                    for await (let resolvedPromise of arr) {
                        commentsArray.push(resolvedPromise);
                    }
                    if(el[0] && arr){
                        res.send({content: el[0].dataValues.content, comments: arr})
                    }
                    else{
                        res.sendStatus(404);
                    }
                })

            })
        }catch (e) {

        }
    })
    app.post('/GetEnt', jsonParser, async (req, res)=>{
        try{
            OtherNews.findAll({where: {id: req.body.id}}).then((el)=>{
                Comments.findAll({where: {OtherNewId: req.body.id}}).then(async (elements) => {
                    let commentsArray = []
                    let arr = await Promise.all(elements.map(async (i)=>{
                        await Users.findByPk(i.dataValues.UserId).then((e)=>{
                            i.dataValues.UserId = e.dataValues.pseudoname;
                        })
                        return i;
                    }))
                    for await (let resolvedPromise of arr) {
                        commentsArray.push(resolvedPromise);
                    }
                    if(el[0] && arr){
                        console.log(commentsArray)
                        res.send({article: el[0].dataValues.article, comments: commentsArray})
                    }
                    else{
                        res.sendStatus(404);
                    }
                })

            })
        }catch (e) {

        }
    })
}