// src/pages/admin/AdminDashboard.js
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await api.get("/admin/users");
        const storesRes = await api.get("/admin/stores");
        const ratingsRes = await api.get("/admin/ratings");

        setUsers(usersRes.data);
        setStores(storesRes.data);
        setRatings(ratingsRes.data);
      } catch (err) {
        console.error("Error fetching admin data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Users Table */}
      <h3>Users</h3>
      <table border="1" cellPadding="5" style={{ marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Stores Table */}
      <h3>Stores</h3>
      <table border="1" cellPadding="5" style={{ marginBottom: "20px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>OwnerId</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>
              <td>{s.ownerId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Ratings Table */}
      <h3>Ratings</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Score</th>
            <th>User</th>
            <th>Store</th>
          </tr>
        </thead>
        <tbody>
          {ratings.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.ratings}</td>
              <td>{r.User?.name || "N/A"}</td>
              <td>{r.Store?.name || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
