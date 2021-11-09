import User from "../models/Usuarios";

export const createUser = async (req, res) => {
    const { user,pwd,name,last_name,birthday,status,gener,date_register,date_update } = req.body
    try {
        const newUser= new User({
            user,pwd,name,last_name,birthday,status,gener,date_register,date_update
        })
        const userSaved = await newUser.save()
        res.status(201).json(userSaved)
    }catch(e){
        console.log(e)
        return res.status(500).json(e)
    }
};

export const getUsers = async (req, res) => {
    const users = await User.find()
    return res.json(users)
};

export const getUserById = async (req, res) => {
    try {
        const {userId}= req.params
    const user = await User.findById(userId)
    res.status(200).json(user)
    } catch (error) {
        res.status(501).json(error)
    }
};

export const updateUserById = async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
            new:true,
        }
        
    )
    res.status(204).json(updateUser)
};

export const deleteUserById = async (req, res) => {
    const {userId}=req.params;
    await User.findByIdAndDelete(userId)
    res.status(204).json()
};

