import User from "../model/User.js";

export const signUpUser= async (req,res)=>{
const {name,email,role}= req.body
try {
    if (!name || !email || !role) {
      return res.status(400).json({ message: "All Fields are required." });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    const newUser = new User({
        name,
        email,
        role
    })
    
    await newUser.save()
    res.status(201).json({
        success:true,
        message:"User registered successfully"
    })
} catch (error) {
    res.status(500).json({
        success:false,
        message: "Internel Server Error"
    })
}
}

