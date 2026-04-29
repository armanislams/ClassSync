import User from "../model/User.js"

export const getUserById= async (req,res)=>{
    const {id} = req.params
    try {
        const user = await User.findById(id)
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Internel Server Error"
        })
    }
}

export const getAllUser =async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).json({
            success:true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Internel Server Error"
        })
    }
}

export const getUserRole=async(req,res)=>{
    const {email} = req.params
    try {
        const user = await User.findOne({email})
        if (!user) {
            return res.status(200).json({
                success:false,
                message: "User Not Found"
            })
        }
        res.status(200).json({
            success:true,
            role: user.role
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: "Internel Server Error"
        })
    }
}