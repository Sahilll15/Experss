const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Assuming User model is defined in a separate file

module.exports.register = async (req, res, next) => {
    const { name, email, password, date } = req.body;

    try {
        let user = await User.findOne({ name });

        if (user) {
            return res.status(400).json({ errors: [{ msg: "The user already exists." }] });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name,
            email,
            password: hashedPassword,
            date // Assuming the correct variable name is 'date'
        });

        const token = jwt.sign({ userId: user._id }, 'secret-key');
        res.status(200).json({ msg: "Success", user: user, token: token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
}

module.exports.login = async (req, res, next) => {


    const { name, password } = req.body;
    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ mssg: "incorrect credintials" })
        }
        const comparepassword = await bcrypt.compare(password, user.password);
        if (!comparepassword) {
            return res.status(400).json({ mssg: "incorrect credintials" })
        }
        const token = jwt.sign({ userId: user._id }, 'secret-key');
        res.status(200).json({ mssg: "User exits", user: user, token: token })

    } catch (error) {
        res.status(500).json({ error })
    }
}


