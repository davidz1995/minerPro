import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
//import NavBar from './components/NavBar';
import Landing from './components/Landing'

function App() {
  return (
    <div>
    <Router>
      <div className="App">
      <Routes>
        <Route exact path='/' element={<Landing/>}/>
      </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
