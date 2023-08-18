const Groups = require("./group.model");
const GroupStudent = require("./group_students.model");
const Students = require("./student.model");

const Relationship = () => {
  Groups.belongsToMany(Students, { through: GroupStudent });
  Students.belongsToMany(Groups, { through: GroupStudent });
};

module.exports = Relationship;
