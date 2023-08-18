const { Router } = require("express");
const { create, addStudent, getGroupStudents } = require("../../api/controllers/group.controller");
const isAdmin = require("../middlewares/isAdmin");
const router = new Router();

router.post("/group", isAdmin, create);
router.post("/add-to-group/:group_id", isAdmin, addStudent);
router.get("/getStudent/:group_id", isAdmin, getGroupStudents)
module.exports = router