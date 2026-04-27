import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotFound = () =>{
    return(
        <div>
            <h1>404</h1>
            <h2>Oops... page not found</h2>
        </div>
    );
};

export default NotFound;