import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password:passwordHash,
      picturePath,
      friends,
      location,
      occupation,
    });

    console.log(newUser)

    const savedUser = await newUser.save();
    res.status(201).json(savedUser); 

  } catch (e) {
    res.status(500).json({error:e.message})
  }
};


export const login =async(req,res)=>{
  try {
    const {email} =req.body;
    const user = await User.findOne({email:email});
    
    if(!user) return res.status(401).json({msg:"User does not exist"})

    const isMatch = await bcrypt.compare(req.body.password,user.password);
    if(!isMatch) return res.status(400).json({msg:"Invalid credentitals."})

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
    
    const{password,...other}=user._doc


    res.status(200).json({token,user:other});

  } catch (e) {
    res.status(500).json({error:e.message})
  }
}
