import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';


// Usage: <ProtectedRoute allow={['ADMIN']}><AdminDashboard/></ProtectedRoute>
export default function ProtectedRoute({ children, allow = [] }) {
const { token, role, loading } = useAuth();


if (loading) return null; // or a spinner component
if (!token) return <Navigate to="/login" replace />;
if (allow.length && !allow.includes(role)) return <Navigate to="/login" replace />;


return children;
}