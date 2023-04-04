const {Sequelize} = require("sequelize");
module.exports = (sequelize) => {
    const ArticleContents = sequelize.define('ArticleContents', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        content: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        images: {
            type: Sequelize.STRING,
            allowNull: true
        }
    })
    return ArticleContents;
}