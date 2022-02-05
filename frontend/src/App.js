import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import GPUvsASIC from "./components/GPUvsASIC";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Products from "./components/Products";
import Login from "./components/Login";
import ClientPanel from "./components/Client/ClientPanel";
import AdminPanel from "./components/Admin/AdminPanel";
function App() {
  return (
    <div>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/info" element={<GPUvsASIC />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/faq" element={<Faq />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/login" element={<Login />} />
            {/* Admin */}
            <Route exact path="/panelAdmin" element={<AdminPanel />} />
            {/* Client */}
            <Route exact path="/panelClient" element={<ClientPanel />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
