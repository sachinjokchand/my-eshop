import mongoose from 'mongoose'
import colors from 'colors'
import dbConnection from './config/db.js'
import User from './models/userModel.js'
import dotenv from 'dotenv'
import users from './data/user.js'

dotenv.config()

dbConnection();

const importData = async ()=>{
    try {
        
        await User.deleteMany()

        const createUser = await User.insertMany(users);


        console.log('SUCCESSFULL STORED'.green.big);

    } catch (error) {
        console.log(`ERROR:- ${error}`.inverse.red);
    }
}

console.log("HELLO");
importData()


