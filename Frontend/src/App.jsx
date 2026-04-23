import { use, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Machines from "./pages/MachinePage";
import Products from "./pages/Products";
import Feedback from "./pages/Feedback";
import Register from "./pages/Register";
import NotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";

axios.defaults.withCredentials = true;

export default function App() {
  // Stores the machine selected from the dashboard or machines page
  const [selectedMachine, setSelectedMachine] = useState(null);
  
  // Stores the user credentials
  const [user, setUser] = useState(null);

  //is website loading
  const [loading, setLoading] = useState(true);

  //navigate to specific page
  const navigate = useNavigate();

  //gets current page
  const location = useLocation();

  const show_sidebar_urls = ["/dashboard", "/machines", "/products", "/feedback"]

  function goHome(){
    navigate("/dashboard");
  }

  function goBack(){
    navigate(-1);
  }
  // Opens the Machines page with the selected machine
  function handleViewMachine(machine) {
    setSelectedMachine(machine);
    navigate("/machines")
  }

  //check if page is login 
  function handleSidebar(){
    return show_sidebar_urls.includes(location.pathname)? true : false;
  }

  useEffect(()=>{
    const fetchUser = async () => {
      try{
        const res = await axios.get("http://localhost:5000/api/auth/me");
        setUser(res.data.user);
      }
      catch(err){
        setUser(null);
      } finally{
        setLoading(false); 
      }
    }
    fetchUser();
  }, []);

  if (loading){
    return <div>Loading...</div>;
  }

  return (
    <>
       {/* Main app layout: sidebar on the left, page content on the right */}
      <div style={{ display: "flex", height: "100vh", overflow: "hidden"}}>
        {handleSidebar()? <Sidebar/>:null} {/* if login do not render sidebar */}
        <main
          style={{
            display: "flex",
            minWidth: 0,
            flex: 1,
            background: "#f8fafc",
            margin: 0,
            overflowY: "auto",
          }}
        >

        <Routes> {/*sets url paths for the website*/}
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path = "/dashboard" element={<Dashboard onViewMachine={handleViewMachine}/>}/>
          <Route path = "/machines" element={
            <Machines
              selectedMachine={selectedMachine}
              onSelectMachine={setSelectedMachine}
              goBack={goBack}
              goHome={goHome}
            />}/>
          <Route path = "/products" element={<Products goBack={goBack} goHome={goHome} />}/>
          <Route path = "/feedback" element={<Feedback  goBack={goBack} goHome={goHome}/>} />
          <Route path = "/login" element={user? <Navigate to="/dashboard"/>:<Login setUser={setUser}/>}/>
          <Route path = "/register" element={user? <Navigate to="/dashboard"/>:<Register setUser={setUser}/>}/>
          <Route path = "*" element={<NotFound/>}/>
        </Routes>
      {/* Global reset and font import */}
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #f8fafc;
          font-family: 'DM Sans', sans-serif;
          margin: 0;
        }
}
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
        </main>
      </div>
    </>
  );
}
