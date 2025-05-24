import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import RegisterForm from './page/auth/register';
import LoginForm from './page/auth/login';
import Dashboard from './page/Dahsboard';
import FoodDetail from './utils/FoodDetail';

const App: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (!user) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/food-detail" element={<FoodDetail  />} />
      <Route path="/login" element={<LoginForm />} />
    </Routes>
  );
};

export default App;
