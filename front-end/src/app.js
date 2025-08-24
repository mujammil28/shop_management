import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/authcontext';
import ProtectedRoute from './components/protectedRoute';
import Navbar from './components/navbar';

// Pages
import Login from './pages/auth/login';
import Signup from './pages/auth/signup';
import UpdatePassword from './pages/auth/UpdatePassword';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageStores from './pages/admin/ManageStores';

import UserDashboard from './pages/user/UserDashboard';
import OwnerDashboard from './pages/owner/OwnerDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/update-password"
            element={
              <ProtectedRoute roles={['admin', 'user', 'owner']}>
                <UpdatePassword />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute roles={['admin']}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/stores"
            element={
              <ProtectedRoute roles={['admin']}>
                <ManageStores />
              </ProtectedRoute>
            }
          />

          {/* User */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute roles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Owner */}
          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute roles={['owner']}>
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route for unknown paths */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
