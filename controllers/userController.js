const userModal = require('../modals/userModel');

const loginController = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await userModal.findOne({ userId, password });
    if (user) {
      res.status(200).json({ message: 'Login successfully', user });
    } else {
      res.status(401).json({ error: 'Invalid credentials or user not verified' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const registerController = async (req, res) => {
  try {
    const newUser = new userModal({...req.body,verified:true});
    await newUser.save();
    res.status(201).json({ message: 'New User added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { loginController, registerController };
