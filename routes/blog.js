const express = require('express')
const mongoose = require('mongoose')
const Blog = require('../models/blogModel')
const { verifytoken } = require('../middleware/verifytoken')
const router = express.Router();

const { addPost, getPosts, getPost, updatePost } = require('../controllers/blogcontroller')

router.post('/addpost', addPost);
router.get('/getPosts', verifytoken, getPosts);
router.get('/getPost/:id', verifytoken, getPost);
router.put('/updatePost/:id', verifytoken, updatePost);


module.exports = router