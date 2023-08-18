const { Model, DataTypes } = require("sequelize");
const sequelize = require("../database/index");

class GroupStudent extends Model {}

GroupStudent.init(
  {
    student_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "group_students",
    createdAt: "created_at",
    updatedAt: "updated_at",
    freezeTableName: true,
  }
);

module.exports = GroupStudent;
