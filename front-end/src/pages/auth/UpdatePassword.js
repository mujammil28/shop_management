import { useState } from 'react';
import api from '../../api/axios';


export default function UpdatePassword() {
const [oldPassword, setOldPassword] = useState('');
const [newPassword, setNewPassword] = useState('');
const [message, setMessage] = useState('');


const handleSubmit = async (e) => {
e.preventDefault();
try {
await api.put('/auth/update-password', { oldPassword, newPassword });
setMessage('Password updated successfully!');
} catch (err) {
setMessage('Error updating password');
}
};


return (
<div className="auth-form">
<h2>Update Password</h2>
{message && <p>{message}</p>}
<form onSubmit={handleSubmit}>
<input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
<input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
<button type="submit">Update</button>
</form>
</div>
);
}