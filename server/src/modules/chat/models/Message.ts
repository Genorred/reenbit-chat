import mongoose from "mongoose";

const Message = new mongoose.Schema<MessageI>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
})

export interface MessageI {
    username: string,
    message: string,
    date: Date,
}

export default mongoose.model('Message', Message)