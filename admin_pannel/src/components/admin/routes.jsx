import React from 'react';
import AdminLayout from './layout/AdminLayout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Crimes from './pages/Crimes';
import Payments from './pages/Payments';
import AdminChatbot from './pages/Chatbot';
import Faqs from './pages/Faqs';
import Scraping from './pages/Scraping';
import Settings from './pages/Settings';

const adminRoutes = [
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'crimes', element: <Crimes /> },
      { path: 'payments', element: <Payments /> },
      { path: 'chatbot', element: <AdminChatbot /> },
      { path: 'faqs', element: <Faqs /> },
      { path: 'scraping', element: <Scraping /> },
      { path: 'settings', element: <Settings /> },
    ]
  }
];

export default adminRoutes;
