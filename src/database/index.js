const {Sequelize} = require("sequelize")  
const sequlize = new Sequelize("postgres://postgres:password@localhost:5432/exam_6")

module.exports = sequlize