import express from 'express';
import { createPost, getAllPosts , getMyPosts, updatePost, deletePost, likePost } from '../controllers/post.controller.js';
import isAuthenticated from '../middlewear/authenticated.js';

const router = express.Router();

router.post("/post/new", isAuthenticated, createPost);
router.get("/post/myPosts", isAuthenticated, getMyPosts);
router.get("/post/getallposts", isAuthenticated, getAllPosts);
router.put("/post/update/:id", isAuthenticated, updatePost);
router.delete("/post/delete/:id", isAuthenticated, deletePost);
router.post("/post/like/:id", isAuthenticated, likePost);



export default router;