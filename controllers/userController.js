import UserModel from "../model/User.js";
import Jwt  from "jsonwebtoken";
 class UserController{
   
  //register
  static userLogin = async (req, res) => {
    
    try {
      console.log("req body",req.body)
      const { email, password } = req.body;  
  
       
      if (!email || !password) {
        return res.status(400).json({ status: 'fail', message: 'Email and password are required', data: null });
      }
      
      const user = await UserModel.findOne({ email: email })
      if (user)
      {
        const data = { userID: user._id, email: user.email, name: user.name }
        
        // Successful login
        if (email === email && password === user.password) {

        const token = Jwt.sign(data,
        process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
         
          return res.status(200).json({ status: 'success', message: 'Login successful', data: {name:user.name,token:token}});
        }
        
        else {
          // Invalid email or password
          return res.status(401).json({ status: 'fail', message: 'Invalid email or password', data: null });
        }
        
      }
      else {
        return res.status(401).json({ status: 'fail', message: 'Invalid email or password', data: null });
      }
 
    }
    catch (error) {
      // Handle generic error
      res.status(500).send({ "status": "error", "message": "Internal server error", "error": error.toString(), data: null });
  }
   
  }


   //isLogin
   static isLogin = async (req, res) => {
    
    try {
      const {email} = req.user;  
      const user = await UserModel.findOne({ email: email })

      if (user) {
        const data = { userID: user._id, email: user.email, name: user.name }
        const token = Jwt.sign(data,
          process.env.JWT_SECRET_KEY, { expiresIn: "5d" })
         // Set JWT token as a cookie
        res.cookie('token', token, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true });
        return res.status(200).json({ status: 'success', message: 'Login successful', data: {name:user.name,token:token}}); 
      }
      else {
        return res.status(401).json({ status: 'fail', message: 'Invalid email or password', data: null });
      }
 
    }
    catch (error) {
      res.status(500).send({ "status": "error", "message": "Internal server error", "error": error.toString(), data: null });
  }
   }
   
   
   //logout
   static logout = async (req, res) => {
     // Clear the token cookie
    res.clearCookie('token');
    // Return success response
    res.status(200).json({ message: 'Logout successful' });
   }
  
  
   
  
}

export default UserController;