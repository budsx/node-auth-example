const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerController = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: `User already exist` });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: passwordHash,
    });
    await user.save().then(() => {
      res.status(201).json({ message: 'Success create new user' });
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: `Wrong Email` });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: `Wrong Password` });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.json({ token });
  } catch (error) {
    console.log(error.message);
  }
};

exports.samplePage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};
