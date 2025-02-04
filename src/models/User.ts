// User.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  address: { type: String, required: false },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);
export default User;