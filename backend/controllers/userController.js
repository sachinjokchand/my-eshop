import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'

//@route POST /api/user
//@desc auth user
const registerUser = asyncHandler(async (req, res) => {
    const { name , email, password } = req.body
    
    if(name==="" || email==="" || password===""){
        res.status(400)
        throw new Error('Fill All details')
    }
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exist')
    }

    const user = await User.create({
        name , 
        email , 
        password
    })

    if (user) {
        res.status(201).json({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            id: user._id,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid User data')
    }
})

//@route POST /api/user/login
//@desc auth user
const getUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        res.json({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            id: user._id,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('incorrect email password')
    }
})

//@route GET /api/user/profile
//@desc auth user
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            id: user._id,
        })
    }else{
        res.status(401)
        throw new Error('User Not Found')
    }
})

//@route PUT /api/user/profile
//@desc auth user
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }
        const updatedUser = await user.save()
        res.json({
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            id: updatedUser._id,
            token : generateToken(updatedUser._id)
        })

    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})

//@route GET /api/user
//@desc get user for admin
const getAllUsers = asyncHandler(async (req, res) => {
   const users = await User.find({})
   res.json(users)
})


//@route DELETE /api/user/:id
//@desc delete user by admin
const deleteUsers = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user){
        user.remove()
        res.json({message : 'User removed'})
    }else{
        res.status(401)
        throw new Error('User not found')
    }

 })

 //@route GET /api/user/:id
//@desc GET user by admin
const getUserByID = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.params.id)
    if(user){
        res.json(user)
    }else{
        res.status(401)
        throw new Error('User not found')
    }

 })

  //@route POST /api/user/profile
//@desc POST make user admin
const makeUserAdmin = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.body.id)
    if(user){
        user.isAdmin = true
        const updatedUser =  user.save()
        res.json(updatedUser)
    }else{
        res.status(401)
        throw new Error('User not found')
    }

 })

export {
    getUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    deleteUsers,
    getUserByID,
    makeUserAdmin
}
