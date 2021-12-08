import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import colors from 'colors'
import morgan from 'morgan'
import productsRoutes from './routes/productRouter.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRouter.js'
import uploadRoutes from './routes/uploadRoutes.js'
import mongoConnection from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import { env } from 'process'
dotenv.config()

mongoConnection();

const app = express()

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())



app.use('/api/user', userRoutes)
app.use('/api/product', productsRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname , 'frontend' , 'build' , 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send("API IS RUNNING");
    })
}

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`server running ${process.env.NODE_ENV} mode on port ${PORT}`))