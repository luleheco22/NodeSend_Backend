import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db';
import userRoute from './routes/userRoute';
import authRoute from './routes/authRoute';
import linksRoute from './routes/linksRoute';
import filesRoute from './routes/filesRoute';

const app=express()
dotenv.config()

connectDB() //Conexion a la base de datos

//Middlewares
app.use(express.json()) //middleware que transforma la req.body a un json
app.use(morgan('dev')); // Mostrar peticiones

//Configure cors
const whitelist=[process.env.FRONTEND_URL]

// const corsOptions={
//     origin:(origin:any,callback:any)=>{
//         console.log(origin)
//        if (whitelist.includes(origin)) {
//           callback(null,true)
//        } else{
//           callback(new Error('Error Cors'))
//        }
//     }
// }

app.use(cors()); // Habilitar cors
app.use(express.urlencoded({extended: false}));

const PORT= process.env.PORT || 4001;


// Habilitar carpeta publica
app.use(express.static('src/uploads'));

//Rutas de la app
app.use('/users', userRoute);
app.use('/auth', authRoute);
app.use('/links', linksRoute);
app.use('/files', filesRoute);

const server=app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`);
})
