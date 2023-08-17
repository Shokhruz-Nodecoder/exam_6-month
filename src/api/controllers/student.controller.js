const Students = require("../../models/student.model");
const bcrypt = require("../../libs/bcrypt");
const jwt = require("../../libs/jwt");
const { promisify } = require("util");
const nodemailer = require("nodemailer");
const Redis = require("ioredis");
const { generateHash, comparePass } = require("../../libs/bcrypt");

const redis = new Redis({
  port: 6379,
  host: "127.0.0.1",

  password: "1234",
});

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const generate = await generateHash(password);
  const findStudent = await Students.findAll({ where: { email: email } });
  console.log("Data:", findStudent);

  if (findStudent.length > 0) {
    return res.status(409).json({ message: "Student already exists" });
  }
  try {
    redis.get("codes", async (err, data) => {
      if (data) {
        // return res.send(JSON.parse(data));
      } else {
        const verifyCode = Math.floor(Math.random() * 9000) + 1000;

        await redis.set("codes", JSON.stringify(verifyCode), "EX", 120);
        await redis.set("firstname", JSON.stringify(firstname), "EX", 120);
        await redis.set("lastname", JSON.stringify(lastname), "EX", 120);
        await redis.set("email", JSON.stringify(email), "EX", 120);
        await redis.set("generate", JSON.stringify(generate), "EX", 120);

        const transporter = nodemailer.createTransport({
          port: 465,
          host: "smtp.gmail.com",
          auth: {
            user: "nasirullayevo7@gmail.com",
            pass: "smenmggcgonbqmwl",
          },
          secure: true,
        });
        const mailData = {
          from: "nasirullayevo7@gmail.com",
          to: email,
          subject: "Verification code",
          text: `Verification code`,
          html: `<b>Login code:${verifyCode}</b><br> Do not give this code to anyone<br/>`,
        };

        await transporter.sendMail(mailData);
        res.status(200).json({
          message:
            "Successfully verifacation password sent. Please show your email code and You will send me...",
        });
      }
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)
    const findUser = await Students.findAll({where : {email : email}}, {logging : false});
    console.log(findUser)
    if (findUser.length < 1) {
      return res
        .status(404)
        .json({ message: "Invalid email or password provided for login" });
    }
    const compare = await comparePass(password, findUser[0].password);
    console.log(compare)

    if (!compare) {
      return res
        .status(404)
        .json({ message: "Invalid password provided to login" });
    }
    const token = jwt.sign({ studentId: findUser[0].id });

    res.cookie("token", token);

    res.status(201).json({ message: `Welcome`, token: token });
  } catch (error) {
    console.log(error);
  }
};

const verify = async (req, res) => {
  try {
    const { verification } = req.body;

    const storedCode = await new Promise((resolve, reject) => {
      redis.get("codes", (err, data) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    if (verification !== storedCode) {
      return res.status(500).json({ message: "Invalid code" });
    }

    const [generate, email, firstname, lastname] = await Promise.all([
      promisify(redis.get).bind(redis)("generate"),
      promisify(redis.get).bind(redis)("email"),
      promisify(redis.get).bind(redis)("firstname"),
      promisify(redis.get).bind(redis)("lastname"),
    ]);

    const newStudent = await Students.create({
      firstname: JSON.parse(firstname),
      lastname : JSON.parse(lastname),
      email : JSON.parse(email),
      password: JSON.parse(generate),
    });

    const token = jwt.sign({ studentId: newStudent.id });
    res.cookie("token", token);

    res.status(201).json({ message: "Student created", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = { register, login, verify };
