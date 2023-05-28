const express = require('express')
const Blog = require('../models/blogModel')

module.exports.addPost = async (req, res, next) => {

    const { title, content, author, tag } = req.body;

    try {
        const post = await Blog.create({
            title,
            content,
            author,
            tag
        });

        await post.save();

        res.status(200).json({ success: true, message: "blog post added succesfully", post })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add blog post' });
    }
}


module.exports.getPosts = async (req, res, next) => {

    try {
        const posts = await Blog.find().populate('author', 'name');

        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch blog posts' });
    }
};


module.exports.getPost = async (req, res, next) => {
    const id = req.params.id
    try {
        const post = await Blog.findById(id)
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to fetch blog posts' });
    }
}

module.exports.updatePost = async (req, res, next) => {
    const id = req.params.id;
    const { title, content } = req.body;
    try {
        const post = await Blog.findByIdAndUpdate(
            id, { title, content },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update the post' });
    }
}