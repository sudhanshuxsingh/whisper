import mongoose, {Schema,Document,Types} from "mongoose";

export interface Feedback extends Document{
    message:string,
    rating?:number,
    createdAt:Date,
    sphere:Types.ObjectId,
    name?:string
}

const FeedbackSchema:Schema<Feedback> = new Schema({
    message:{
        type:String,
        required:[true,'Message can\'t be empty']
    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    sphere:{
        type:Schema.ObjectId,
        ref:'Sphere',
        required:[true,'A Feedback must belong to a Sphere']
    },
    name:{
        type:String
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
})

export const FeedbackModel=
        (mongoose.models.User as mongoose.Model<Feedback>) ||
        mongoose.model<Feedback>('Feedback',FeedbackSchema)