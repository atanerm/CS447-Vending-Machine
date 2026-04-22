import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import dotenv from 'dotenv';

const router = express.Router();

const cookieOptions = {
    httpOnly: true, //mitigate cross site scripting
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict', //mitigates cross site request forgery
    maxAge: 30 * 24 * 60 * 60 * 1000 //30 days
}

const generateToken = (user_id) => {
    return jwt.sign({user_id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

//Sign Up
router.post("/register", async (req, res) =>{ //create  a new User
    const {firstName, lastName, email, password} = req.body;
    let roleID;
    if (!firstName || !lastName || !email || !password){ //if values are empty
        return res.status(400).json({message: "Please fill in all required fields"});
    }

    const userExists = await pool.query("SELECT role_id FROM USERS WHERE EMAIL = $1", [email]); //get users with that email

    if (userExists.rows.length > 0){ //if user already exists
        return res.status(400).json({message: 'User already exists'}) //email is not unique (invalid)
    }

    const getRoleID = await pool.query("SELECT * FROM PRE_APPROVED_USERS WHERE EMAIL = $1", [email]); //checks if user is privileged 

    if (getRoleID.rows.length > 0) { //if user is already privileged
        roleID = getRoleID.rows[0].role_id;
    }

    else if (getRoleID.rows.length === 0){ //if not pre approved (regular non pivileged user)
        const roleResult = await pool.query(
            "SELECT role_id FROM ROLES WHERE role_name ILIKE $1", ['student']
        );
        roleID = roleResult.rows[0].role_id;
    }   
    
    //hash the password bcyrpt hash + salt 2^12
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await pool.query(
        "INSERT INTO Users (first_name, last_name, email, password, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [firstName, lastName, email, hashedPassword, roleID] //create new user
    );

    const token = generateToken(newUser.rows[0].user_id);

    res.cookie('token', token, cookieOptions);

    return res.status(201).json({user: newUser.rows[0]}); //return user id, name and email
}); 

//Login
router.post("/login", async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password){ //if values are empty
        return res.status(400).json({message: "Please fill in all required fields"});
    }

    //check if user exists
    const userExists = await pool.query("SELECT * FROM USERS WHERE EMAIL = $1", [email]); //get users with that email
    if (userExists.rows.length === 0){ //if user already exists
        return res.status(400).json({message: 'Invalid email or password'}) //email is not unique (invalid)
    }
    const userData = userExists.rows[0]

    //get specific role from user
    const roleResult = await pool.query("SELECT role_id FROM USERS WHERE EMAIL = $1", [email]);
    if (roleResult.rows.length === 0){
        return res.status(500).json({message: 'User does not have a role id'});
    }
    const roleId = roleResult.rows[0].role_id;
    const userRole = await pool.query("SELECT role_name FROM ROLES WHERE role_id = $1", [roleId]);

    if (userRole.rows.length === 0){
        return res.status(500).json({message: 'User does not have a defined role'});
    }
    const roleData = userRole.rows[0];

    //compare hashed/salted password with given password
    const isMatch = await bcrypt.compare(password, userData.password);

    if (!isMatch){
        return res.status(400).json({message: 'Invalid email or password'})
    }

    const token = generateToken(userData.user_id);

    res.cookie('token', token, cookieOptions);
 
    res.json({user: 
        {user_id: userData.user_id, 
        firstName: userData.first_name, 
        lastName: userData.last_name, 
        email: userData.email,
        role_name: roleData.role_name
        }
    });
});


//logout
router.post('/logout', (req, res) => {
    res.cookie('token', '', {...cookieOptions, maxAge: 1});
    res.status(200).json({ message: 'Logged out' });
});

export default router;