const {Model, DataTypes} = require("sequelize")
const sequelize = require("../database/index")

class Students extends Model{}

Students.init({
    firstname : {
        type : DataTypes.STRING,
        allowNull : false
    },
    lastname : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    sequelize,
    tableName : "students",
    createdAt : "created_at",
    updatedAt : "updated_at",
    freezeTableName : true
})

module.exports = Students