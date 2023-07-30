import mongoose, { mongo } from "mongoose";

const chatSchema = new mongoose.Schema({
    content:{
        type: String,
    },
    user: {
        type: String,
    }, 
    roomId: {
        type: String,
    }
},
{
    timestamps: true
}
);
export const Chat = mongoose.model('Chat', chatSchema);