const Groups = require("../../models/group.model");
const GroupStudent = require("../../models/group_students.model");
const Students = require("../../models/student.model");
const { includes } = require("../routes");

const create = async (req, res) => {
  const { name } = req.body;

  await Groups.create({ name });
  res.status(201).json({ msg: "Success" });
};

const getGroups = async (req, res) => {
  try {
    const groups = await Groups.findAll();
    res.status(200).json({ message: "Success", groups });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
const addStudent = async (req, res) => {
  try {
    const { group_id } = req.params;
    const isGroup = await Groups.findByPk(group_id);

    if (isGroup === null) {
      return res.json({ message: "Group not found" });
    }

    const { student_id } = req.body;

    const student = await GroupStudent.findAll({
      where: { student_id: student_id },
    });
    const isStudent = await Students.findByPk(student_id);

    if (student.length > 0) {
      return res.json({ message: "Student already existed" });
    } else if (isStudent == null) {
      return res.json({ message: "Student not found" });
    }

    await GroupStudent.create({ group_id, student_id });
    res.status(201).json({ msg: "Success" });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const getGroupStudents = async (req, res) => {
  try {
    const { group_id } = req.params;
    const student = await GroupStudent.findAll(
      { where: { group_id: group_id } },
      { includes: [Students, Groups] }
    );
    console.log(student);
    res.status(200).json({ msg: "Success", student });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { create, addStudent, getGroupStudents, getGroups };
