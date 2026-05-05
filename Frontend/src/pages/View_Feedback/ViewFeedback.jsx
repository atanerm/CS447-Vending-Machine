import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import "./ViewFeedback.css"

const ViewFeedback = ({goBack, goHome}) => {
    const [feedback, setFeedback] = useState([]);
    const [error, setError] = useState("");

    async function fetchFeedback(){
        try{
            const response = await axios.get("/api/auth/view/feedback");
            setFeedback(response.data);
            console.log(feedback);
        }
       catch(err){
            setError(err.response?.data?.message);
            console.error("Something went wrong:", error);
        }
    }
    useEffect(() => {
        fetchFeedback();
    }, []);
    return(
        <div style={pageLayout}>
            <div style={pageContent}>
                {/* Navigation buttons */}
                <div style={navRow}>
                    <button onClick={goBack} style={navBtn}>
                        ← Back
                    </button>
                    <button onClick={goHome} style={navBtn}>
                        Home
                    </button>
                </div>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Machine ID</th>
                            <th>Subject</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedback?.map((query) => (
                            <tr key={query.feedback_id}>
                                <td>{query.machine_id}</td>
                                <td>{query.subject.slice(0,15)}</td>
                                <td>{query.user?.username}</td>
                                <td>{query.user?.email}</td>
                                <td>{query.created_at.slice(0,10)}</td>
                                <td><button>View</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    );
}

export default ViewFeedback;

const pageLayout = {
  padding: "32px 36px",
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
};

const pageContent = {
  width: "100%",

};

const navRow = {
  display: "flex",
  gap: 10,
  marginBottom: 20,
};


const navBtn = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#374151",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
};