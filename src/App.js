import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'sweetalert2/src/sweetalert2.scss'
import Home from './screens/Home';
import Booking from './screens/Booking';
import Register from './screens/Register';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Admin from './screens/Admin';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path='/home' exact Component={Home} />
          <Route path='/book/:roomId/:fromDate/:toDate' Component={Booking} />
          <Route path='/register' exact Component={Register} />
          <Route path='/login' exact Component={Login} />
          <Route path='/profile' exact Component={Profile} />
          <Route path='/admin' exact Component={Admin}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
