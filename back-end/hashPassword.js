const bcrypt = require("bcryptjs");

const pass= async function resetPassword() {
  const newPassword = "Admin@123"; // choose your new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  console.log("Save this hash in your DB:", hashedPassword);
}


module.exports = pass();
