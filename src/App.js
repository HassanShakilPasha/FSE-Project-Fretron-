import './App.css';
import Header from './MY Components/Header';
import Body from './MY Components/Body';
import Dashboard from './MY Components/Dashboard';
import CreateRoute from './MY Components/CreateRoute';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import Login from './MY Components/Login';
import FindRoute from './MY Components/FindRoute';
import MyBookings from './MY Components/My Bookings';
import { getCurrentUser, logoutUser } from './utils/storage';
import PageLoader from './MY Components/PageLoader';
import Antigravity from './MY Components/Antigravity';

function ProtectedRoute({ currentUser, requiredRole, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function AppContent({ currentUser, isLoggedIn, onAuthSuccess, onLogout }) {
  const location = useLocation();
  const isFirstRender = useRef(true);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <div className="appAntigravityBg" aria-hidden="true">
        <Antigravity
          autoAnimate
          count={220}
          color="#2e8fff"
          ringRadius={8}
          magnetRadius={12}
          particleSize={1.25}
          waveAmplitude={0.8}
          rotationSpeed={0.12}
          fieldStrength={9}
        />
      </div>

      <div className="appLayer">
        <Header currentUser={currentUser} onLogout={onLogout} />
        {isPageLoading ? (
          <PageLoader />
        ) : (
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
                  <Login onAuthSuccess={onAuthSuccess} />
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
        )}
      </div>
    </>
  );
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
        <AppContent
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onAuthSuccess={handleAuthSuccess}
          onLogout={handleLogout}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;