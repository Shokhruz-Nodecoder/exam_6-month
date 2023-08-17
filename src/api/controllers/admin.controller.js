const Admin = require("../../models/admin.model");
const bcrypt = require("../../libs/bcrypt");
const jwt = require("../../libs/jwt");
const { generateHash, comparePass } = require("../../libs/bcrypt");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
   
    const generate = await generateHash(password);
      
    const findAdmin = await Admin.findAll({ where: { username: username } }, {logging: false});
    console.log(findAdmin);
    if (findAdmin.length > 0) {
      return res.status(409).json({ message: "Admin already exists" });
    } 

    const newAdmin = await Admin.create({
      username,
      password: generate,
    });

    const token = jwt.sign({ adminId: newAdmin.id }); // Use the newly created user

    res.cookie("token", token);

    res.status(201).json({ message: `Succesfully created admin`, token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const findAdmin = await Admin.findAll({ where: { username: username } });
    
    if (!findAdmin.length) {
      return res.status(404).json({ message: "Username or password invalid" });
    }

    const compare = await comparePass(password, findAdmin[0].password);
    if (!compare) {
      return res.status(404).json({ message: "Passwords do not match" });
    }
    const token = jwt.sign({ userId: findAdmin.id });

    res.cookie("token", token);

    res.status(201).json({ message: `Welcome`, token: token });
    // res.redirect("/admin");
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = { register, login };