
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwtSecret = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
    const { name, email, password, mobile } = req.body;
  
    // Validate inputs
    if (!name || !email || !password || !mobile) {
      return res.status(400).json({ errors: [{ message: 'All fields are required' }] });
    }
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ errors: [{ message: 'Email already in use' }] });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = new User({ name, email, password: hashedPassword, mobile });
      await user.save();
  
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error during signup:', error.message);  // Log the error message
      console.error('Stack Trace:', error.stack);  // Log the stack trace for debugging
      res.status(500).json({ message: 'Server error', error: error.message });  // Send detailed error response
    }
  };
  
  exports.login = async (req,res)=>{
    const {email,password}=req.body;

try{
    const user = await User.findOne({ name, password});
    if(!user){
        return res.status(400).json({message:'Invalid credentials'});
    }


    //compare password with the hashed password stored in the db
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message:'Invalid credentials'});
    }


    //JWT
    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

}catch(error){
    console.error('Error during login:', error.message);
    res.status(500).json({message:'server error'});
}

  };