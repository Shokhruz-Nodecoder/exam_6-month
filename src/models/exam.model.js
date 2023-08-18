const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/index")


class Exams extends Model {}

Exams.init(
  {
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE(),
      allowNull: false,
    },
    duration : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "exams",
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: false,
  }
);

module.exports = Exams;