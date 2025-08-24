import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authcontext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const validate = () => {
    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(form.email)) return "Invalid email address.";
    if (!form.password) return "Password is required.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setError('');
    try {
      const role = await login(form.email, form.password);
      if (!role) return setError("Login failed. Role not returned.");

      if (role === 'admin') navigate('/admin/dashboard');
      else if (role === 'user') navigate('/user/dashboard');
      else if (role === 'owner') navigate('/owner/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed. Invalid credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Login</button>
    </form>
  );
}
