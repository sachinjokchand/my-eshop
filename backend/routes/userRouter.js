import express from 'express'
import {
     getUser,
     registerUser,
     getUserProfile,
     updateUserProfile,
     getAllUsers,
     deleteUsers,
     getUserByID,
     makeUserAdmin
} from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

const routes = express.Router()

// route to api/user
routes.route('/').post(registerUser).get(protect, isAdmin, getAllUsers)
routes.route('/login').post(getUser)
routes.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile).post(protect, isAdmin, makeUserAdmin)
routes.route('/:id').delete(protect, isAdmin, deleteUsers).get(protect, isAdmin, getUserByID)

export default routes