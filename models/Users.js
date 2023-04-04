const {Sequelize} = require("sequelize");


module.exports = (sequelize) => {
    const Users = sequelize.define('Users', {
            id:{
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name:{
                type: Sequelize.STRING,
                allowNull: false
            },
            surname:{
                type: Sequelize.STRING,
                allowNull: false
            },
            pseudoname:{
                type: Sequelize.STRING,
                allowNull: false
            },
            email:{
                type: Sequelize.STRING,
                allowNull: false
            },
            password:{
                type: Sequelize.STRING,
                allowNull: false
            },
            status:{
                type: Sequelize.INTEGER,
                allowNull: false
            },
            otherData:{
                type: Sequelize.STRING,
                allowNull: false
            },
            birthdate:{
                type: Sequelize.STRING,
                allowNull: false
            }
        }
    )
    return Users;
}