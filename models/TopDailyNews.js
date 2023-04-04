const {Sequelize} = require("sequelize");
module.exports = (sequelize) => {
    const TopDailyNews = sequelize.define(
        'TopDaily', {
            id:{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            h1: {
                type: Sequelize.STRING,
                allowNull: false
            },
            content:{
                type: Sequelize.TEXT,
                allowNull: false
            },
            images:{
                type: Sequelize.STRING,
                allowNull: true
            }
        }, {
            timestamps: false
        }
    )
    return TopDailyNews;
}