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
import ChangePassword from "./components/ChangePassword";
import Suspended from "./components/Suspended";
import FullUsersList from "./components/Admin/FullUsersList"
import FullMinersList from "./components/Admin/FullMinersList"
import FullPayoutList from "./components/Admin/FullPayoutList"
import RecoverPassword from "./components/RecoverPassword";


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
            <Route exact path="/change-password" element={<ChangePassword />} />
            {/* Admin */}
            <Route exact path="/panelAdmin" element={<AdminPanel />} />
            <Route exact path="/fullUsersList" element={<FullUsersList />} />
            <Route exact path="/fullMinersList" element={<FullMinersList />} />
            <Route exact path="/fullPaymentList" element={<FullPayoutList />} />
            {/* Client */}
            <Route exact path="/panelClient" element={<ClientPanel />} />
            <Route exact path="/suspended" element={<Suspended />} />
            <Route exact path="/recover-password" element={<RecoverPassword />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
