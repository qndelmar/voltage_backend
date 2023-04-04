const Sequelize = require('sequelize');
let config = require('../super-ultra-hyper-mega-secret/config');  // we use node-config to handle environments

// initialize database connection
const sequelize = new Sequelize(config.uri);

// load models
const models = [
    'Opinions',
    'Comments',
    'Users',
    'OtherNews',
    'TopDailyNews',
    'ArticleContents'
];
models.forEach(function(model) {
    module.exports[model] = require(__dirname + '/' + model)(sequelize);
});

// describe relationships
(function(m) {
    console.log(m);
    m.Opinions.belongsTo(m.ArticleContents);
    m.ArticleContents.hasOne(m.Opinions);
    m.Opinions.hasMany(m.Comments);
    m.TopDailyNews.hasMany(m.Comments);
    m.OtherNews.hasMany(m.Comments);
    m.Users.hasOne(m.Comments);
})(module.exports);

// export connection
module.exports.sequelize = sequelize;