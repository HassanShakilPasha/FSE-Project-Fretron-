import './App.css';
import Header from './MY Components/Header';
import Body from './MY Components/Body';
import Dashboard from './MY Components/Dashboard';
import CreateRoute from './MY Components/CreateRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './MY Components/Login';
import FindRoute from './MY Components/FindRoute';
import MyBookings from './MY Components/My Bookings';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/CreateRoute" element={<CreateRoute />} />
          <Route path="/login" element={<Login />} />
          <Route path="/FindRoute" element={<FindRoute />} />
          <Route path="/My Bookings" element={<MyBookings />} />


          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;