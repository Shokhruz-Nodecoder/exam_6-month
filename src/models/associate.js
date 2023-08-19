const Exams = require("./exam.model");
const Groups = require("./group.model");
const GroupStudent = require("./group_students.model");
const Students = require("./student.model");
const Tasks = require("./task.model");

const Relationship = () => {
  Groups.hasMany(Exams, { foreignKey: "group_id" });
  Exams.belongsTo(Groups, { foreignKey: "group_id"});

  Groups.hasMany(Tasks, { foreignKey: "group_id" });
  Tasks.belongsTo(Groups, { foreignKey: "group_id"});


  Groups.belongsToMany(Students, { through: GroupStudent });
  Students.belongsToMany(Groups, { through: GroupStudent });
};

module.exports = Relationship;
