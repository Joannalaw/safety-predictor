import Post from "../models/post.model.js";
import mongoose from "mongoose";
import {GoogleGenerativeAI} from "@google/generative-ai";


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

    const riskScore = await textGenTextOnlyPrompt(post.content);
    const newPost = new Post({...post,'safetyIndex': Number(riskScore)||0});

    console.log(newPost)
    try {
        await newPost.save();
        res.status(201).json({success: true, data: newPost})
    } catch (error) {
        console.error("Error in Create Post", error.message);
        res.status(500).json({success: false, message: 'Server Error'})
    }
}

async function textGenTextOnlyPrompt(query) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "identify the sentence and generate a score of danger from 0 - 10, only return me to score as a number";
    // const query = ["feeling so blue", 'hate the world','love my child']

    const result = await model.generateContent(prompt+ query);
    console.log(result.response.text());
    return result.response.text();
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