const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: null,
  },
  passwordHash: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

// Index for email lookups
UserSchema.index({ email: 1 });
UserSchema.index({ googleId: 1 });

module.exports = mongoose.model('User', UserSchema);
