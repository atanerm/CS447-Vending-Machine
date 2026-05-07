import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const protect_login = async (req, res, next) => {
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message: "Not authorized, please log in"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await pool.query("SELECT user_id, first_name, last_name, email, role_id FROM USERS WHERE user_id = $1",
            [decoded.user_id]);

        if (user.rows.length === 0){
            return res.status(401).json({message: "Not authorized, user not found"});
        }

        const my_user = user.rows[0]; 

        const role = await pool.query(
            "SELECT role_name FROM roles WHERE role_id = $1",
            [my_user.role_id]
        );
         
        const role_name = role.rows.length > 0 ? role.rows[0].role_name : "Student";
        req.user = {
            user_id: my_user.user_id,
            first_name: my_user.first_name,
            last_name: my_user.last_name,
            email: my_user.email,
            role_id: my_user.role_id,
            role_name
        };
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