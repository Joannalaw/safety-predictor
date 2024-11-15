import express from "express";
import {addPost, deletePost, getPosts, updatePost} from "../controllers/post.controller.js";

const router = express.Router();

router.get('/', getPosts)

router.post('/', addPost)

router.put("/:id", updatePost)

router.delete("/:id", deletePost)

export default router;