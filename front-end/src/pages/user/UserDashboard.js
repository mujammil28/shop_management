// src/pages/user/UserDashboard.js
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await api.get("/stores");
        setStores(res.data); // should include averageRating + userRating
      } catch (err) {
        console.error(err);
      }
    };
    fetchStores();
  }, []);

  const submitRating = async (storeId, rating) => {
    try {
      await api.post(`/stores/${storeId}/rate`, { rating });
      alert("Rating submitted!");
      // refresh list so updated rating shows
      const res = await api.get("/stores");
      setStores(res.data);
    } catch (err) {
      alert("Error submitting rating");
    }
  };

  return (
    <div>
      <h2>User Dashboard</h2>
      {stores.map((store) => (
        <div key={store.id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
          <h3>{store.name}</h3>
          <p>{store.address}</p>
          <p>Overall Rating: {store.averageRating || "N/A"}</p>
          <p>Your Rating: {store.userRating || "Not rated yet"}</p>
          {[1, 2, 3, 4, 5].map((r) => (
            <button key={r} onClick={() => submitRating(store.id, r)}>
              {r} ⭐
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
