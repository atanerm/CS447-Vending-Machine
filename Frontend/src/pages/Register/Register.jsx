import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";


const Register = ({ setUser }) =>{
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        setError("");
        try{
            const res = await axios.post("/api/auth/register", form);
            navigate("/login");
        } 
        catch(err){
            setError(err.response?.data?.message || "Registration failed");
        }
    }
    return(
        <div className="global-register">
            <div className="register-card">
            <form onSubmit={handleSubmit}>
                <h2 style={{color: "#333333"}}>Welcome!</h2>
                <p style={{color: "#777070"}}>Create your account below</p>
                {error && <p className="fail-message">{error}</p>}
                <div className="full-name">
                    <input
                        type = "text"
                        placeholder = "First Name"
                        value = {form.firstName}
                        onChange={(e) => setForm({...form, firstName: e.target.value})}
                        className="register"/>
                    
                    <input
                        type = "text"
                        placeholder = "Last Name"
                        value = {form.lastName}
                        onChange={(e) => setForm({...form, lastName: e.target.value})}
                        className="register"/>
                </div>
                <div className="email">
                <input 
                    type = "email" 
                    placeholder="Email" 
                    value={form.email} 
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="register"/>
                </div>
                <div className="">
                    <input 
                        type = "password" 
                        placeholder="Password" 
                        value={form.password} 
                        onChange={(e) => setForm({...form, password: e.target.value})}
                        className="register"/>
                </div>
                <div>
                    <button className="registerbtn button">Sign Up</button>
                </div>
                <p>Already have an account? <Link to = '/login' style={{color:"#228B22", textDecoration: "None"}}>Login</Link></p>
            </form>
        </div>
        </div>
    );
};

export default Register;