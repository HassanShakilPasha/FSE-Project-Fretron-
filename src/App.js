import './App.css';
import Header from './MY Components/Header';
import Body from './MY Components/Body';
import Dashboard from './MY Components/Dashboard';
import CreateRoute from './MY Components/CreateRoute';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Login from './MY Components/Login';
import FindRoute from './MY Components/FindRoute';
import MyBookings from './MY Components/My Bookings';
import { getCurrentUser, logoutUser } from './utils/storage';

function ProtectedRoute({ currentUser, requiredRole, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());

  const isLoggedIn = useMemo(() => Boolean(currentUser), [currentUser]);

  function handleAuthSuccess(user) {
    setCurrentUser(user);
  }

  function handleLogout() {
    logoutUser();
    setCurrentUser(null);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute currentUser={currentUser}>
                <Dashboard currentUser={currentUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-route"
            element={
              <ProtectedRoute currentUser={currentUser} requiredRole="transporter">
                <CreateRoute currentUser={currentUser} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Login onAuthSuccess={handleAuthSuccess} />
              )
            }
          />
          <Route path="/find-route" element={<FindRoute />} />
          <Route
            path="/my-routes"
            element={
              <ProtectedRoute currentUser={currentUser} requiredRole="transporter">
                <MyBookings currentUser={currentUser} />
              </ProtectedRoute>
            }
          />
          <Route path="/Dashboard" element={<Navigate to="/dashboard" replace />} />
          <Route path="/CreateRoute" element={<Navigate to="/create-route" replace />} />
          <Route path="/FindRoute" element={<Navigate to="/find-route" replace />} />
          <Route path="/My Bookings" element={<Navigate to="/my-routes" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;