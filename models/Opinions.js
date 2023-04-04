const { Sequelize } = require("sequelize");

module.exports = (sequelize) => {
    const Opinions = sequelize.define(
        'Opinions', {
            id:{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            description:{
                type: Sequelize.STRING,
                allowNull: false
            },
            imagepath:{
                type: Sequelize.STRING,
                allowNull: false
            }
        }
    )
    return Opinions;
};