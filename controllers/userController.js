const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



exports.registerUser = async (req, res) => {
    try {
      const { personal_information } = req.body
      console.log(req.body);
      
      if (!personal_information?.email || !personal_information?.password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  
      const existingUser = await User.findOne({ 'personal_information.email': personal_information?.email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(personal_information?.password, 10);
      req.body.personal_information.password = hashedPassword;
  
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.loginUser = async (req, res) => {
    try {
      const { email, password} = req.body;
      const user = await User.findOne({ 'personal_information.email': email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(password, user.personal_information.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      res.status(200).json({ token,user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.getLoggedInUser = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


//   (async () => {
//     try {
//         await User.deleteMany({});
//       const users = await User.find();
//       console.log("All Users:", users);
//     } catch (error) {
//       console.error("Error fetching users:", error.message);
//     }
//   })();