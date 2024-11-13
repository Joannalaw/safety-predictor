import Post from "../models/post.model.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({success: true, data: posts})
    } catch (error) {
        console.log("error in fetching posts:", error.message)
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const addPost = async (req, res) => {
    const post = req.body;
    if (!post.content || !post.username) {
        return res.status(400).json({success: false, message: 'Please provide all fields'});
    }
    const newPost = new Post(post);

    try {
        await newPost.save();
        res.status(201).json({success: true, data: newPost})
    } catch (error) {
        console.error("Error in Create Post", error.message);
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

export const updatePost = async (req, res) => {
    const {id} = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid Post Id'});
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, post, {new: true})
        res.status(200).json({success: true, data: updatedPost})
    } catch (error) {
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

export const deletePost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: 'Invalid Post Id'});
    }

    try {
        await Post.findByIdAndDelete(id);
        res.status(200).json({success: true, message: 'Post deleted'})
    } catch (error) {
        res.status(500).json({success: true, message: 'Server Error'})
    }
}