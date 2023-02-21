import {model,Schema,Document} from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUser extends Document {
    email:string;
    password:string;
    name?:string;
    comparePassword:(password:string) => Promise<Boolean>
};

const userSchema = new Schema({
    email: {
        type:String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type:String,
        require: true,
        trim: true,
    },
    name: {
        type:String,
        require: true,
        trim: true,
    },
});

//Este es un middleware para verificar si se modifico el password del usuario
userSchema.pre<IUser>("save", async function(next){
    const user = this;

    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    next();
});

userSchema.methods.comparePassword = async function(password:string):Promise<Boolean>{
   return await bcrypt.compare(password, this.password);
};

export default model<IUser>("User",userSchema);
