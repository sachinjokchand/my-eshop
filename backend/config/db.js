import mongoose from 'mongoose'

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI , {
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log(`CONNECT TO M_DB ${conn.connection.host}`.underline.green);
    } catch (error) {
        console.log(`ERROR:- ${error}`.red.underline);
    }
}

export default connectDB;