const {Sequelize} = require("sequelize");
module.exports = (sequelize) => {
    const OtherNews = sequelize.define(
        'OtherNews',{
            id:{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            category:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            name:{
                type: Sequelize.STRING,
                allowNull: false
            },
            description:{
                type: Sequelize.STRING,
                allowNull: false
            },
            article:{
                type: Sequelize.TEXT,
                allowNull: false
            },
            rating:{
                type: Sequelize.STRING,
                allowNull: false
            },
            images:{
                type: Sequelize.STRING,
                allowNull: false
            }
        }
    )
    return OtherNews;
}