const { Router } = require("express");
const {
  register,
  login,
  verify,
} = require("../controllers/student.controller");
const router = new Router();

router.post("/signup", register);
router.post("/signin", login);
router.post("/signup/verify", verify);
module.exports = router;
