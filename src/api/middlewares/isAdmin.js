const jwt = require("../../libs/jwt");
const cookie = require("cookie-parser");
const Admins = require("../../models/admin.model");

const isAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(403).json({ message: "Invalid token" });
    const adminId = jwt.verify(token);
    if (adminId.userId == undefined) {
      return res.status(404).json({ message: "Not access to you" });
    }
    const admin = await Admins.findAll(
      {
        where: {
          id: adminId.userId,
        },
      },
      {
        logging: false,
      }
    );

    if (!admin) return res.status(403).json({ message: "Not allowed" });

    req.admin = admin;

    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({ message: error.message });
  }
};

module.exports = isAdmin;
