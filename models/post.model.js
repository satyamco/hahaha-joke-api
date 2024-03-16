import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    joke: {
        type: 'string',
        required: true,
        maxlength: 200
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

export const Post = mongoose.model('Post', postSchema);