// src/pages/owner/OwnerDashboard.js
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function OwnerDashboard() {
  const [ratings, setRatings] = useState([]);
  const [avg, setAvg] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await api.get("/owner/store/ratings"); 
        setRatings(res.data.ratings);
        setAvg(res.data.averageRating);
      } catch (err) {
        console.error("Error fetching ratings", err);
      }
    };
    fetchRatings();
  }, []);

  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      <p>Average Rating: {avg || "N/A"}</p>
      <h3>Ratings from Users</h3>
      {ratings.length === 0 ? (
        <p>No ratings yet.</p>
      ) : (
        <ul>
          {ratings.map((r) => (
            <li key={r.userId}>
              {r.userName} rated {r.rating} ⭐
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
