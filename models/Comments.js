const {Sequelize} = require("sequelize");
module.exports = (sequelize) => {
    const Comments = sequelize.define(
        'Comments', {
            id:{
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            text:{
                type: Sequelize.TEXT,
                allowNull: false
            }
        }
    )
    return Comments;
}