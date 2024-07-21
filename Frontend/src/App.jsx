import * as React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import SignUpPage from './pages/SignUpPage';
import AdminDashboard from './pages/AdminDashboard';
import UserProfile from './pages/UserProfile';
import EventDetails from './pages/EventDetails';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import UserProfileEdit from './pages/UserProfileEdit.jsx';
import './App.css';

function App() {
  const location = useLocation();
  const hideNavbarFooter = ['/login', '/signup', '/admin-login'].includes(location.pathname);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/admin-login' element={<AdminLogin/>}/>
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/event-details' element={<EventDetails />} />
        <Route path='/user-profile-edit' element={<UserProfileEdit />} />
      </Routes>
      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
