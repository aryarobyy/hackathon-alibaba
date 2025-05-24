import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../provider/userProvider';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!email) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email format';
    if (!username) errs.username = 'Username is required';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      await register({ email, username, password });
      navigate('/login');
    } catch (err: any) {
      setApiError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} noValidate>
        {apiError && <p className="text-red-600 text-center mb-4">{apiError}</p>}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
        </div>
        <div className="flex gap-1">
          <p>Belum punya akun?</p>
          <Link to="/login" className="text-blue-500 hover:underline font-medium">
            Daftar
          </Link>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-xl transition disabled:opacity-50"
        >
          {loading ? 'Signing up…' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
