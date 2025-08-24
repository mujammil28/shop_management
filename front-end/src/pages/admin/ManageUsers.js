import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  // Sorting state
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [sortBy, order]); // re-fetch when sort changes

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users", {
        params: { ...filters, sort: sortBy, order },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => fetchUsers();

  const toggleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>

      <div>
        <input
          name="name"
          placeholder="Filter by Name"
          onChange={handleFilterChange}
        />
        <input
          name="email"
          placeholder="Filter by Email"
          onChange={handleFilterChange}
        />
        <input
          name="address"
          placeholder="Filter by Address"
          onChange={handleFilterChange}
        />
        <input
          name="role"
          placeholder="Filter by Role"
          onChange={handleFilterChange}
        />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th onClick={() => toggleSort("name")}>
              Name {sortBy === "name" ? `(${order})` : ""}
            </th>
            <th onClick={() => toggleSort("email")}>
              Email {sortBy === "email" ? `(${order})` : ""}
            </th>
            <th onClick={() => toggleSort("address")}>
              Address {sortBy === "address" ? `(${order})` : ""}
            </th>
            <th onClick={() => toggleSort("role")}>
              Role {sortBy === "role" ? `(${order})` : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
