import { Link } from 'react-router-dom';
import { useAuth } from '../context/authcontext';


export default function Navbar() {
const { auth, logout } = useAuth();


return (
<nav>
{auth?.role === 'admin' && (
<>
<Link to="/admin/dashboard">Dashboard</Link> |
<Link to="/admin/users">Manage Users</Link> |
<Link to="/admin/stores">Manage Stores</Link>
</>
)}


{auth?.role === 'user' && (
<Link to="/user/dashboard">User Dashboard</Link>
)}


{auth?.role === 'owner' && (
<Link to="/owner/dashboard">Owner Dashboard</Link>
)}


{auth ? (
<button onClick={logout}>Logout</button>
) : (
<>
<Link to="/login">Login</Link> | <Link to="/signup">Signup</Link>
</>
)}
</nav>
);
}