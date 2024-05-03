import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const blogSchema = new Schema(
  {
    name: { type: String, required: true },
    image: String,
    description: String,
    category: {
      type: String,
      enum: ["Sports", "Health"],
      default: "Health",
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

blogSchema.plugin(mongoosePaginate);

export const Blog = mongoose.model("Blog", blogSchema);
