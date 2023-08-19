const jwt = require("../../libs/jwt");
const cookie = require("cookie-parser");
const Students = require("../../models/student.model")
const isStudent = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(403).json({ message: "Invalid token" });
    const adminId = jwt.verify(token);
    if (adminId.studentId == undefined) {
      return res.status(404).json({ message: "Not access to you" });
    }
    const student = await Students.findAll(
      {
        where: {
          id: adminId.studentId,
        },
      },
      {
        logging: false,
      }
    );

    if (!student) return res.status(403).json({ message: "Not allowed" });

    req.student = student;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
};

module.exports = isStudent;
