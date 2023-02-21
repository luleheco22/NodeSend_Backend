import mongoose, {model,Schema} from 'mongoose'
import { IUser } from './users';


export interface ILink {
  url:string;
  name:string;
  original_name:string;
  downloads:number;
  author:IUser;
  password:string;
  created:Date;
};


const linkSchema = new Schema({
   url: {
    type:String,
    required: true
   },
   name: {
    type:String,
    required: true
   },
   original_name: {
    type:String,
    required: true
   },
   downloads: {
     type:Number,
     default: 1
   },
   author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
   },
   password: {
     type: String,
     default: null
   },
   created: {
      type:Date,
      default: Date.now()
   }

})

export default model<ILink>("Link",linkSchema);