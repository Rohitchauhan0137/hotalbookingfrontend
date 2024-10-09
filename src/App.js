import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './screens/Home';
import Booking from './screens/Booking';
import Register from './screens/Register';
import Login from './screens/Login';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path='/home' exact Component={Home} />
          <Route path='/book/:roomId/:fromDate/:toDate' Component={Booking}/>
          <Route path='/register' Component={Register}/>
          <Route path='/login' Component={Login}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
