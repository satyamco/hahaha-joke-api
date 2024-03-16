import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

export const createPost = async (req, res) => {
    try {
        const { joke } = req.body;
        const userId = req.user._id;
        const post = await Post.create({ joke, user: userId });
        if (!post) {  
            return res.status(404).json("cannot create post something went wrong")
        }
        const postId = post._id;
        const user = await User.findById(userId);
        user.post.push(postId);
        await user.save();
        return res.status(200).json("post created successfullyz")

    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts)
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

export const getMyPosts = async (req, res) => {
    try {
        const userId = req.user._id;
        const myPosts = await Post.find({ user: userId });
        res.status(200).json(myPosts)
    } catch (error) {
        return res.status(404).json({ message: error.message });

    }
}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByIdAndUpdate(id, req.body);
        if (!post) {
            res.status(404).json("post not found")
        }
        const updatedPost = await Post.findById(id);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const findPost = await Post.findById(id);
        if(!findPost) {
            res.status(404).json("post not found")
        }
        await Post.findByIdAndDelete(findPost._id);
        res.status(200).json("post deleted successfully")
    } catch (error) {
        res.status(404).json({ message: error.message });

    }
}

export const likePost  = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if(!post) {
           return res.status(404).json("post not found");
        }
        const userid = req.user._id;
        const indexOfUser = post.likes.indexOf(userid);
        if(post.likes.includes(userid)){
            return res.status(300).json("likes already liked this post");
        }
        post.likes.push(userid);
        
        await post.save();
        return res.status(200).json(post)
    } catch (error) {
        res.status(404).json({sucess: false, sms: "post not found", message: error.message });
        
    }
}