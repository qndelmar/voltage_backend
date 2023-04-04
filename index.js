const express = require("express");
const {Sequelize, where, Op, DataTypes} = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:password@localhost:5432/voltage");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {tokenKey} = require('./super-ultra-hyper-mega-secret/token');
const {genSalt} = require("bcrypt");
const {salt} = require('./super-ultra-hyper-mega-secret/salt');
const {max} = require("pg/lib/defaults");
const fs = require('fs')
const cors = require('cors')
const models = require('./models');
const Opinions = models.Opinions;
const ArticleContents = models.ArticleContents;
const OtherNews = models.OtherNews
const TopDailyNews = models.TopDailyNews;
const Comments = models.Comments;
const Users = models.Users;
const app = express();
app.set('models', require('./models'));
const jsonParser = express.json({limit: '10mb'});
app.use(express.static('public'))
app.use(cors());
require('./handlers/Auth/index')(app, jsonParser, Users);
require('./handlers/Register/index')(app, jsonParser, Users);
require('./handlers/ChangingData/index')(app, jsonParser, Users);
require('./handlers/GettingManyPosts/index')(app, jsonParser, Opinions, OtherNews, TopDailyNews);
require('./handlers/GetSoloPosts/index')(app, jsonParser, OtherNews, Opinions, TopDailyNews, Comments, ArticleContents, Users)
require('./handlers/AddFeatures')(app, jsonParser, Comments, OtherNews, TopDailyNews, Opinions, ArticleContents)
require('./handlers/DeleteContent')(app, jsonParser, TopDailyNews, OtherNews, Opinions);

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

sequelize.sync().then(result=>{
    console.log("Synced succesfully");
}).catch(err=> console.log(err));


app.listen(8000, "localhost");

module.exports = app;
