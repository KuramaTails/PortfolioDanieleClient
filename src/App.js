import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Head from "./components/Head";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Photo from "./routes/Photo";
import Manage from "./routes/Manage";
import Modelling from "./routes/Modelling";
import { useState } from "react";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <Router>
      <Head />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/photo" element={<Photo />} />
        <Route path="/modelling" element={<Modelling />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/manage" element={<Manage isAuthenticated={isAuthenticated}/>} />
      </Routes>
    </Router>
  );
}

export default App;
