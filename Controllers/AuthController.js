const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/userModel");

const signin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({
      email: email,
    });
    if (user) {
      return res
        .status(409)
        .json({ message: "user already exist , you can login", sucess: false });
    }
    const userModel = new UserModel({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10);
    await userModel.save();
    res
      .status(201)
      .json({ message: "user created successfully", sucess: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", sucess: false });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email: email,
    });
    if (!user) {
      return res
        .status(403)
        .json({ message: "Auth failed to login", sucess: false });
    }

    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res
        .status(403)
        .json({ message: "Auth failed to login", sucess: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(201).json({
      message: "user created successfully",
      sucess: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", sucess: false });
  }
};

module.exports = { signin, login };
