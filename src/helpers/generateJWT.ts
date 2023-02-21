import jwt from 'jsonwebtoken'
import { IUser } from '../models/users';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const createJWT = (user:IUser) => {
    return jwt.sign({ id:user._id, email: user.email, name: user.name }, <string>process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
}

export default createJWT