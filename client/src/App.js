import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import EditAgent from './EditAgent';
import jwtDecode from "jwt-decode";
import NotFound from './NotFound';
import Agents from './Agents';
import AddAgent from './AddAgent';
import DeleteAgent from './DeleteAgent';

function App() {

  const [user, setUser] = useState(null);

  useEffect( () => {
    const jwt_token = localStorage.getItem("token");
    if( jwt_token ){
      setUser({ user: jwtDecode(jwt_token) });
    }
  }, []);



  return (
    <AuthContext.Provider value={[user, setUser]}>
      <div className="App">
        <Nav />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/addAgents" element={<AddAgent />} />
            <Route path="/agents" element={<Agents />} />
            <Route path="/deleteAgent/:agentId" element={<DeleteAgent />} />
            <Route path="/editAgent/:agentId" element={<EditAgent />} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;