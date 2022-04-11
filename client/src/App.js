import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthContext from "./AuthContext";
import Home from "./Home";
import Nav from "./Nav";
import Login from "./Login";
import Agents from "./Agents";

function App() {

  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={[user, setUser]}>
      <div className="App">
        <Nav />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="api/agents" elements={<Agents />}/>
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;