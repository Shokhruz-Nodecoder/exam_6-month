const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class Tasks extends Model {}

Tasks.init(
  {
    isActive: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
    data: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

module.exports = Tasks;
