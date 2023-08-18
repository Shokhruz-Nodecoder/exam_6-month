const {Router} = require("express")
const isAdmin = require("../middlewares/isAdmin")
const { create, getExams } = require("../controllers/exam.controller")
const router = new Router()


router.post("/exam/:group_id", isAdmin, create)
router.get("/exam/:group_id", isAdmin, getExams)

module.exports = router