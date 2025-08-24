import { useState } from "react";
import { useAuth } from "../../context/authcontext";

export default function Signup() {
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Validation function
  const validate = () => {
    if (form.name.trim().length < 20 || form.name.trim().length > 60) {
      return "Name must be between 20 and 60 characters.";
    }

    if (form.address.trim().length > 400) {
      return "Address must not exceed 400 characters.";
    }

    // Email validation
    if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(form.email.trim())) {
      return "Invalid email address.";
    }

    // Password validation: 8–16 chars, at least 1 uppercase + 1 special char
    if (!/^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,16}$/.test(form.password)) {
      return "Password must be 8-16 chars, include 1 uppercase and 1 special character.";
    }

    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    try {
      await signup({
        name: form.name.trim(),
        email: form.email.trim(),
        address: form.address.trim(),
        password: form.password,
      });

      setSuccess("Signup successful! Please login.");
      setForm({ name: "", email: "", address: "", password: "" });
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Address"
        value={form.address}
        onChange={(e) => setForm({ ...form, address: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Signup</button>
    </form>
  );
}
