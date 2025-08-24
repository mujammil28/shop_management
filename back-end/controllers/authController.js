const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role: 'user'
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id; // added by verifyToken middleware

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) return res.status(400).json({ message: 'Old password is incorrect' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNewPassword });

    res.json({ message: 'Password updated successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
