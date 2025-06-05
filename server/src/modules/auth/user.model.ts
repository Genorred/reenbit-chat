import mongoose, {Document, Schema} from 'mongoose';
import bcrypt from 'bcryptjs';
import {Chat} from "../chat/models/chat.model";

export interface IUser extends Document {
    googleId?: string;
    email: string;
    name: string;
    password?: string;
    picture?: string;
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;

    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        googleId: {type: String, sparse: true},
        email: {type: String, required: true, unique: true},
        name: {type: String, required: true},
        password: {type: String},
        picture: {type: String},
        isEmailVerified: {type: Boolean, default: false},
        emailVerificationToken: {type: String},
        emailVerificationExpires: {type: Date},
        resetPasswordToken: {type: String},
        resetPasswordExpires: {type: Date},
        refreshToken: {type: String}
    },
    {timestamps: true}
);

// Хеширование пароля перед сохранением
userSchema.pre('save', async function (next) {
    const userId = this._id
    if (this.isNew)
        try {
            void Chat.create({
                firstName: 'Nelson',
                lastName: 'Irving',
                userId
            })
            void Chat.create({
                firstName: 'Decker',
                lastName: 'Dior',
                userId
            })
            void Chat.create({
                firstName: 'Piter',
                lastName: 'Parker',
                userId
            })
        } catch (error) {
            // next(error as Error);
        }


    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password!, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    if (!this.password) return false;
    return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema); 