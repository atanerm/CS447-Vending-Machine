import React, { useState } from "react";
import { useNavigate, Link, useLocation} from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import "./ViewFeedback.css"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alignItems, display } from "@mui/system";

const ViewFeedback = ({goBack, goHome}) => {
    const [feedback, setFeedback] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showCard, setShowCard] = useState(false);
    const [clickedQuery, setClickedQuery] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(()=> {
        const fetchFeedback = async () => {
            try{
                const response = await axios.get("/api/auth/view/feedback");
                setFeedback(response.data);
            }
            catch(err){
                setError(err.response?.data?.message);
                console.error("Something went wrong:", error);
            }
            finally{
                setLoading(false);
            }
        };
        fetchFeedback();
    }, [refreshKey]);

    const resolveFeedback = async () => {
        try{
            const response = await axios.put("/api/auth/view/feedback", {feedback_id: clickedQuery.feedback_id});
        }
        catch(err){
            setError(err.response?.data?.message);
            console.error("Something went wrong:", error);
        }
        handleCancelView();
        setRefreshKey(oldKey => oldKey +1)
    };


    if (loading) return <div>Loading...</div>;

    const handleViewClick = (query) => {
        setShowCard(true);
        setClickedQuery(query);
    };

    const handleCancelView = () =>{
        setShowCard(false);
        setClickedQuery("");
    }
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
                            {showCard && (
                            <tr>
                            <td>
                            <div
                                style={{
                                    position: "fixed",
                                    top: 0,
                                    left: 0,
                                    width: "100vw",
                                    height: "100vh",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "rgba(0,0,0,0.3)", 
                               
                                }}
                                >
                                <Card className = "cardStyle" style={{borderRadius:30}}variant="outlined" sx={{ mt: 2 }}>
                                    <CardContent>
                                        <div className="inter-text">
                                            <h1>{clickedQuery.machine_id}</h1>
                                            <h2>{clickedQuery.subject}</h2>
                                            <p>{clickedQuery.send_message}</p>
                                            <div style={styleBtns}>
                                                <button style = {cancelBtn} onClick={handleCancelView}>Cancel</button>
                                                <button style = {resolveBtn} onClick={resolveFeedback}>Resolve</button>
                                            </div>
                                            <div style = {{
                                                display:'flex', 
                                                gap: 10, 
                                                color: "gray", 
                                                justifyContent: "center",
                                                alignItems: "center"}}>
                                                <p>{clickedQuery.user?.username}</p>
                                                <p>{clickedQuery.user?.email}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                    
                                </Card>
                            </div>
                            </td>
                            </tr>
                            )}
                            {feedback?.map((query) => (query.status.toLowerCase() === 'open'?
                                <tr key={query.feedback_id}>    
                                <td>{query.machine_id}</td>
                                <td>{query.subject.slice(0,30)}</td>
                                <td>{query.user?.username}</td>
                                <td>{query.user?.email}</td>
                                <td>{query.created_at.slice(0,10)}</td>
                                <td><button style={viewBtn} onClick={() => handleViewClick(query)}>View</button></td>
                            </tr>:null
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

const viewBtn = {
  padding: "6px 14px",
  borderRadius: 7,
  background: "#0f172a",
  color: "#fff",
  border: "none",
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  transition: "background 0.15s",
};

const styleBtns = {
    display: 'flex',
    marginTop: 10,
    gap: 5,
    justifyContent: "center",
    alignItems: "center" 
}

const cancelBtn = {
  background: "#ef4444",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "15px 30px",
  cursor: "pointer",
  fontWeight: 700,
};

const resolveBtn = {
  background: "#10b981",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "15px 30px",
  cursor: "pointer",
  fontWeight: 700,
};
