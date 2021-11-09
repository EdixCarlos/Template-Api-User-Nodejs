import User from '../models/Usuarios'
import jwt from 'jsonwebtoken'
import config from "../config";
import Roles from '../models/Roles';
export const signUp = async (req,res)=>{
    const {user,pwd,name,last_name,birthday,roles}=req.body
    const newUser = new User({
        user,
        pwd: await User.encryptPassword(pwd),
        name,
        last_name,
        birthday
    })
    if(roles){
        const foundRoles =await Roles.find({name: {$in: roles}})
        newUser.roles = foundRoles.map(roles=>roles._id)
        
    }else{
        const role = await Roles.findOne({name:"user"})
        newUser.roles = [role._id]
    }
    const savedUser = await newUser.save()
    console.log(savedUser)
    const token = jwt.sign({id: savedUser._id},config.SECRET,{
        expiresIn: 86400//10 dias
    })
    res.json({token})
}

export const signIn = async (req,res)=>{
    const userFound = await User.findOne({user: req.body.user}).populate("roles")
    if (!userFound)return res.status(400).json({message:"user not foudn"})

    const matchPassword = await User.comparePassword(req.body.pwd, userFound.pwd)
    if (!matchPassword)return res.status(401).json({token: null,message:'invalid password'})
    const token =jwt.sign({id:userFound._id},config.SECRET,{
        expiresIn: 86400
    })
    console.log(userFound)
    res.json({token})
}

