const {Model, DataTypes} = require("sequelize")
const sequelize = require("../database/index")

class Groups extends Model{}

Groups.init({
    name : {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    sequelize,
    tableName : "groups",
    createdAt : "created_at",
    updatedAt : "updated_at",
    freezeTableName : true
})

module.exports = Groups