const Exams = require("../../models/exam.model");
const Groups = require("../../models/group.model");
const Tasks = require("../../models/task.model");
const { v4: uuid } = require("uuid");
const path = require("path");
const create = async (req, res) => {
  try {
    const { task, duration } = req.body;
    const { group_id } = req.params;
    const isGroup = await Groups.findByPk(group_id);

    if (isGroup === null) {
      return res.json({ message: "Group is not found" });
    }
    const start_date = new Date();
    console.log(start_date);

    end_date = new Date(new Date().getTime() + duration * 60 * 60 * 1000);

    console.log(end_date);

    await Exams.create({ task, duration, group_id, start_date, end_date });
    res.json({ mesg: "Success" });
    return;
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const getExams = async (req, res) => {
  try {
    const { group_id } = req.params;
    const isGroup = await Groups.findByPk(group_id);

    if (isGroup === null) {
      return res.json({ message: "Group is not found" });
    }
    const data = await Exams.findAll({ where: { group_id: group_id } });

    res.status(201).json({ message: "Success", data });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const getOneExam = async (req, res) => {
  try {
    const { exam_id } = req.params;
    const exam = await Exams.findByPk(exam_id, { include: [Groups] });
    console.log(exam);
    res.json({ message: "Success", exam });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const sendExam = async (req, res) => {
  try {
    const { group_id } = req.params;
    const { data } = req.files;
    const { exam_id } = req.body;

    const group = await Groups.findOne({
      where: { id: group_id },
      logging: false,
    });

    // console.log(group)

    if (!group) {
      return res.status(403).json({ message: "Group not found" });
    }

    const fileName = `${uuid()}${path.extname(data.name)}`;
    data.mv(process.cwd() + "/uploads/" + fileName);

    const exams = await Exams.findAll({
      where: { group_id: group.id },
      logging: false,
    });

    // console.log(exams)

    // console.log(exams[0].end_date.getTime())
    // console.log(new Date().getTime())
    const findExam = exams.find((exam) => exam.id === Number(exam_id));

    if (
      exams.length === 0 ||
      findExam.end_date.getTime() < new Date().getTime()
    ) {
      const task = await Tasks.create(
        { data: fileName, isActive: false },
        { logging: false }
      );

      res.status(200).json({ message: "Success", task });
    } else {
      const task = await Tasks.create(
        { data: fileName, isActive: true, group_id },
        { logging: false }
      );

      res.status(200).json({ message: "Success", task });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getOneTask = async (req, res) => {
  try {
    const { task_id } = req.params;

    const task = await Tasks.findByPk(task_id, { include: [Groups] });
    res.json({ message: "Success", task });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.findAll();
    res.json({ msg: "Success", tasks });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = {
  create,
  getExams,
  getOneExam,
  sendExam,
  getOneTask,
  getTasks,
};
