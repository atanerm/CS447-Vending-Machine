import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css"

const Login = ({ setUser }) =>{
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError("");
        try{
            const res = await axios.post("/api/auth/login", form);
            setUser(res.data.user);
            console.log(res.data.user);
            navigate("/dashboard");
        } 
        catch(err){
        setError(err.response?.data?.message || "Invalid email or password");
        }
    }
    return(
        <div className="global-login">
            <div className="login-card">
                <form onSubmit={handleSubmit}>
                    <h2 style={{color: "#333333"}}>Welcome back!</h2>
                    <p style={{color: "#777070"}}>Sign in to continue</p>
                    {error && <p className="fail-message">{error}</p>}
                    <div>
                        <input 
                        type = "email" 
                        placeholder="Email" 
                        value={form.email} 
                        onChange={(e) => setForm({...form, email: e.target.value})}
                        className="login"/>
                    </div>
                    <div className="">
                        <input 
                        type = "password" 
                        placeholder="Password" 
                        value={form.password} 
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        className="login"/>
                    </div>
                    <div>
                        <button className="loginbtn button">Login</button>
                    </div>
                     <p>Dont have an account yet? <Link to = '/register' style={{color:"#228B22", textDecoration: "None"}}>Register</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;