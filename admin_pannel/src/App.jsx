import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminLayout from './components/admin/layout/AdminLayout';
import Dashboard from './components/admin/pages/Dashboard';
import Users from './components/admin/pages/Users';
import Crimes from './components/admin/pages/Crimes';
import Payments from './components/admin/pages/Payments';
import AdminChatbot from './components/admin/pages/Chatbot';
import Faqs from './components/admin/pages/Faqs';
import Scraping from './components/admin/pages/Scraping';
import Settings from './components/admin/pages/Settings';

function App() {
  const isAuthenticated = localStorage.getItem('access_token') !== null;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            isAuthenticated ? <AdminLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="crimes" element={<Crimes />} />
          <Route path="payments" element={<Payments />} />
          <Route path="chatbot" element={<AdminChatbot />} />
          <Route path="faqs" element={<Faqs />} />
          <Route path="scraping" element={<Scraping />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
