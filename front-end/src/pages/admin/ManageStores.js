import { useEffect, useState } from 'react';
import api from '../../api/axios';


export default function ManageStores() {
const [stores, setStores] = useState([]);


useEffect(() => {
fetchStores();
}, []);


const fetchStores = async () => {
try {
const res = await api.get('/admin/stores');
setStores(res.data);
} catch (err) {
console.error(err);
}
};


return (
<div>
<h2>Manage Stores</h2>
<table border="1">
<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Address</th>
<th>Rating</th>
</tr>
</thead>
<tbody>
{stores.map((s) => (
<tr key={s.id}>
<td>{s.name}</td>
<td>{s.email}</td>
<td>{s.address}</td>
<td>{s.rating || 'N/A'}</td>
</tr>
))}
</tbody>
</table>
</div>
);
}