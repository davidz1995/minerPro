import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from './components/Landing'
import GPUvsASIC from './components/GPUvsASIC';
import Faq from './components/Faq';
import Contact from './components/Contact';

function App() {
  return (
    <div>
    <Router>
      <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
        <Route exact path='/info' element={<GPUvsASIC/>}/>
        <Route exact path='/faq' element={<Faq/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
      </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
