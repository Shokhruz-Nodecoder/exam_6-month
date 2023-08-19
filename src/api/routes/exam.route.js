const {Router} = require("express")
const isAdmin = require("../middlewares/isAdmin")
const { create, getExams, getOneExam, sendExam, getOneTask, getTasks } = require("../controllers/exam.controller")
const router = new Router()


router.post("/exam/:group_id", isAdmin, create)
router.get("/exams/:group_id", isAdmin, getExams)
router.get("/exam/:exam_id", isAdmin, getOneExam)
router.post("/exam/send/:group_id", sendExam)


router.get("/exam/task/:task_id", isAdmin, getOneTask)
router.get("/tasks", isAdmin, getTasks)

module.exports = router