import {Schema, model, Document, Types} from 'mongoose';

export interface IChat extends Document {
    firstName: string;
    lastName: string;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const chatSchema = new Schema<IChat>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Chat = model<IChat>('Chat', chatSchema); 