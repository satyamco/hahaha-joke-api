import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true,
        index: true,
    },
    email: {
        type: 'string',
        required: true,
        unique: true,
    },
    password:{
        type: 'string',
        required: true,
    },
    profilePicture:{
        type: 'string',
        required: false,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    post:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    savedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],

},{timestamps: true})

export const User = mongoose.model('User', userSchema);