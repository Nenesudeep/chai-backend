import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String, // coludinary Url
      required: true,
    },
    thumnail: {
      type: String, // coludinary Url
      required: true,
    },
    title: {
      type: String, // coludinary Url
      required: true,
    },
    description: {
      type: String, // coludinary Url
      required: true,
    },
    duration: {
      type: Number, // coludinary Url
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
