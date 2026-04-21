import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const protect_login = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Not authorized, no token"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user_id = await pool.query("SELECT user_id, first_name, last_name, email role_id FROM USERS WHERE user_id = $1",
            [decoded.id]);

        if (user_id.rows.length === 0){
            return res.status(401).json({message: "Not authorized, user not found"});
        }

        //req.user = user.rows[0];
        next();
    }
    catch(error){
        console.log(error);
        return res.status(401).json({message: "Not authorized, token failed"});
    }
}


export const authorize_staff = async (req, res, next) => {
    try{
        if(req.user){
            role_name = req.user.role_name
            if(role_name.lower() === "student"){
                return res.status(403).json({message: "User not privileged. Access denied"});
            }
            next();
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Idk something aint working"});
    }
}

export const authorize_admin = async (req, res, next) => {
    try{
        if(req.user){
            role_name = req.user.role_name;
            if(role_name.lower() != "admin"){
                return res.status(403).json({message: "User not privileged. Access denied"});
            }
            next();
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message: "Idk something aint working"});
    }
}