import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
            const res = await axios.post("http://localhost:5000/api/auth/login", form);
            setUser(res.data.user);
            console.log(res.data.user);
            navigate("/dashboard");
        } 
        catch(err){
        setError(err.response?.data?.message || "Invalid email or password");
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p>{error}</p>}
                <input 
                    type = "email" 
                    placeholder="Email" 
                    value={form.email} 
                    onChange={(e) => setForm({...form, email: e.target.value})}/>
                <input 
                    type = "password" 
                    placeholder="Password" 
                    value={form.password} 
                    onChange={(e) => setForm({...form, password: e.target.value})}/>
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;