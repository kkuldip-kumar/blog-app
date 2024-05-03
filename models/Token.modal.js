import mongoose, { Schema } from "mongoose";

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 24 * 60 * 60,
  },
});

// Set an index on the "createdAt" field with a TTL (time-to-live) of 24 hours
tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 24 * 60 * 60 });

export const Token = mongoose.model("token", tokenSchema);
