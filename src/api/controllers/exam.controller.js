const Exams = require("../../models/exam.model");
const Groups = require("../../models/group.model");
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




// const sendExams = async (req,res) =>{
//     const {group_id} = req.params
//     const {} = req.body
// }


module.exports = { create, getExams };
