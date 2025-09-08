const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const User = require("../models/user")
const {sendWelcomeEmail} = require("../utitlities/sendMail")

const generateToken = ({userId, email, name})=>{
   return jwt.sign({id: userId, email, name}, process.env.JWT_SECRET,{
        expiresIn: "15m",
    })

}
//signup
//get access to the req.body
//check if theres an existing user 
//if no user, create user
//save user in database and protect user password
//send a welcome mail
exports.signup = async (req,res) => {
    console.log("Signup route hit");
    
    const { name, email, password } = req.body
    console.log(req.body);
    try {
        //if user exists?
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({success: false, message : "User already exist"})
        }
        if (!name, !email,!password) {
            return res.status(400).json({message: "Please provide all credentials"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        //no user,create new user
        const user = new User({
            name : name,
            email: email,
            password : hashedPassword,
        })
        //save user
        await user.save();

        const link=`${process.env.CLIENT_URL}/sign-in`;
        try {
            await sendWelcomeEmail(
                user.name,
                link,
                user.email,
            )
        } catch (error) {
            console.log("error sending email", error);    
        }
        const token = generateToken({userId: user._id, email:user.email,name:user.name})
        res.status(201).json({success: true , message: "user created successfully", token})
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({message: "signup failed", error: error.message})
    }
}

//get access to req.body
//find user using user.findOne
exports.signin = async (req, res) => {
  console.log("Signin route hit"); 

  const { email, password } = req.body; 
  console.log(req.body);
  

  try {
    if (!email || !password) {  
      return res.status(400).json({ message: "Please provide all credentials" });
    }

    const user = await User.findOne({ email }); 

    if (!user) {  
      return res.status(400).json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password); 

    if (!isMatch) {  
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    //create session token
    const token = generateToken({  
      userId: user._id,
      email: user.email,
    });

    res.status(200).json({  
      success: true,
      message: "Signin successful",
      token,
      user:{
        id: user._id,
        email: user.email,
      }
    });

  } catch (error) {
    console.error("Signin error:", error);  

    res.status(500).json({  
      message: "Signin failed", 
      error: error.message, 
    });
  }
};
