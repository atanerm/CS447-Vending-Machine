import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
        try{
            const res = await axios.post("http://localhost:5000/api/auth/register", form);
            navigate("/login");
        } 
        catch(err){
            setError(err.response?.data?.message || "Registration failed");
        }
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <input
                    type = "text"
                    placeholder = "First Name"
                    value = {form.firstName}
                    onChange={(e) => setForm({...form, firstName: e.target.value})}/>
                
                <input
                    type = "text"
                    placeholder = "Last Name"
                    value = {form.lastName}
                    onChange={(e) => setForm({...form, lastName: e.target.value})}/>

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
                <button>Sign Up</button>
            </form>
        </div>
    );
};

export default Register;