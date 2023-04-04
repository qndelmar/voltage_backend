const jwt = require("jsonwebtoken");
const {tokenKey} = require("../../super-ultra-hyper-mega-secret/token");
const fs = require("fs");
module.exports = function(app, jsonParser, Comments, OtherNews, TopDailyNews, Opinions, ArticleContents){
    app.post('/AddComment', jsonParser, async (req, res) => {
        const token = req.headers.authorization.split(' ')[1];
        const information = jwt.decode(token, tokenKey);
        console.log(information);
        if(req.body.category === 0){
            await Comments.create({text: req.body.text, OpinionId: req.body.id, UserId: information.id}).then(()=>{
                res.status(200).send();
            }).catch((e) => {
                res.status(404).send();
            })
        }
        else if(req.body.category === 1){
            await Comments.create({text: req.body.text, OtherNewId: req.body.id, UserId: information.id}).then(()=>{
                res.status(200).send();
            }).catch((e) => {
                res.status(404).send();
            })
        }
        else if (req.body.category === 2){
            await Comments.create({text: req.body.text, TopDailyId: req.body.id, UserId: information.id}).then(()=>{
                res.status(200).send();
            }).catch((e) => {
                res.status(404).send();
            })
        }
    })
    app.post('/AddPostToDb', jsonParser, async (req, res) => {
        try{
            if(req.body.imageInfo && req.body.title.length > 5 && req.body.article && req.body.imageData){
                let response = await fs.writeFileSync(`public/img/${req.body.imageInfo}`, req.body.imageData.split(',')[1], {encoding: 'base64'})
                if(req.body.category === 'HOT NEWS'){
                    await TopDailyNews.create({
                        h1: req.body.title,
                        content: req.body.article,
                        images: `http://localhost:8000/img/${req.body.imageInfo}`
                    }).catch((e) => res.status = 500)
                }
                else if(req.body.category === 'Entertainment'){
                    await OtherNews.create({
                        category: 1,
                        name: req.body.title,
                        description: req.body.article.split('.')[0],
                        article: req.body.article,
                        rating: 0.0,
                        images: `http://localhost:8000/img/${req.body.imageInfo}`
                    }).catch((e) => res.status = 500)
                }
                else if(req.body.category === 'Opinions'){
                    await ArticleContents.create({content: req.body.article, images: `http://localhost:8000/img/${req.body.imageInfo}`}).then((post)=>{
                        console.log(post);
                        Opinions.create({
                            name: req.body.title,
                            description: req.body.article.split('.')[0],
                            imagepath: `http://localhost:8000/img/${req.body.imageInfo}`,
                            ArticleContentId: post.dataValues.id
                        }).then((article) => {
                            console.log(article);
                        }).catch((e) => res.status = 500)
                    })

                }
            }
        }catch (e) {
            res.status = 500;
            console.log(e);
        }
        res.send();
    })
}