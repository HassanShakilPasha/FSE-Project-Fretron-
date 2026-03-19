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
import AnimatedBackground from './MY Components/AnimatedBackground';
import { saveCurrentUser, toggleActiveRole } from './utils/storage';

function ProtectedRoute({ currentUser, requiredRole, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && currentUser.role !== 'admin') {
    const effectiveRole = currentUser.activeRole || currentUser.role;
    if (effectiveRole !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
}

function AppContent({ currentUser, isLoggedIn, onAuthSuccess, onLogout, onToggleRole }) {
  const location = useLocation();
  const isFirstRender = useRef(true);
  const [isPageLoading, setIsPageLoading] = useState(false);

  const pageTheme = useMemo(() => {
    const themes = [
      {
        match: (pathname) => pathname === '/',
        background: 'radial-gradient(circle at 18% 18%, #f3ecff 0%, #dde5ff 38%, #b8d0ff 72%, #a9beff 100%)',
        color: '#7869ea',
      },
      {
        match: (pathname) => pathname.startsWith('/dashboard'),
        background: 'radial-gradient(circle at 18% 18%, #edf2ff 0%, #d7ddff 36%, #b7c8ff 68%, #97b1ff 100%)',
        color: '#5f76ea',
      },
      {
        match: (pathname) => pathname.startsWith('/create-route'),
        background: 'radial-gradient(circle at 18% 18%, #f6eaff 0%, #e0d5ff 35%, #c5beff 68%, #adb0ff 100%)',
        color: '#8b6ff0',
      },
      {
        match: (pathname) => pathname.startsWith('/find-route'),
        background: 'radial-gradient(circle at 18% 18%, #ebf4ff 0%, #d2dcff 36%, #b9c5ff 68%, #a9b7ff 100%)',
        color: '#6b7ae8',
      },
      {
        match: (pathname) => pathname.startsWith('/my-routes'),
        background: 'radial-gradient(circle at 18% 18%, #f2e8ff 0%, #d7deff 36%, #b6c6ff 68%, #97b4ff 100%)',
        color: '#7c68e0',
      },
      {
        match: (pathname) => pathname.startsWith('/login'),
        background: 'radial-gradient(circle at 18% 18%, #f7efff 0%, #e3e6ff 36%, #ccd1ff 68%, #b6c0ff 100%)',
        color: '#8d71ef',
      },
    ];

    return themes.find((theme) => theme.match(location.pathname)) || {
      background: 'radial-gradient(circle at 18% 18%, #eef3ff 0%, #d8e0ff 40%, #becfff 74%, #aabfff 100%)',
      color: '#6f7be8',
    };
  }, [location.pathname]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setIsPageLoading(true);
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <div className="appBackground" aria-hidden="true" style={{ background: pageTheme.background }}>
        <AnimatedBackground
          autoAnimate
          count={220}
          color={pageTheme.color}
          ringRadius={8}
          magnetRadius={12}
          particleSize={1.25}
          waveAmplitude={0.8}
          rotationSpeed={0.12}
          fieldStrength={9}
        />
      </div>

      <div className="appLayer">
        <Header currentUser={currentUser} onLogout={onLogout} onToggleRole={onToggleRole} />
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
            <Route path="/my-routes" element={<ProtectedRoute currentUser={currentUser}><MyBookings currentUser={currentUser} /></ProtectedRoute>} />
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
    setCurrentUser(saveCurrentUser(user));
  }

  async function handleLogout() {
    await logoutUser();
    setCurrentUser(null);
  }

  function handleToggleRole() {
    setCurrentUser((current) => toggleActiveRole(current));
  }

  return (
    <div className="App">
      <BrowserRouter>
        <AppContent
          currentUser={currentUser}
          isLoggedIn={isLoggedIn}
          onAuthSuccess={handleAuthSuccess}
          onLogout={handleLogout}
          onToggleRole={handleToggleRole}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;