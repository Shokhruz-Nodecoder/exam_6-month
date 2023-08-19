const {Router} = require("express")
const isAdmin = require("../middlewares/isAdmin")
const { create, getExams, getOneExam } = require("../controllers/exam.controller")
const router = new Router()


router.post("/exam/:group_id", isAdmin, create)
router.get("/exams/:group_id", isAdmin, getExams)
router.get("/exam/:exam_id", isAdmin, getOneExam)

module.exports = router