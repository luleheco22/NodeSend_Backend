import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const connectDB = async ():Promise<void> => {
    try {
        const connection= await mongoose.connect(<string>process.env.MONGO_URI,{
                useNewUrlParser: true,
                useUnifiedTopology: true,  
        } as ConnectOptions )
        const url=`${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB Conectado en ${url} `)
    } catch (error) {
        console.log(error)
        console.log('Hubo un error')
        process.exit(1)
    }
}

export default connectDB
