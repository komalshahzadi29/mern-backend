import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema(
  {
    title: String, // String is shorthand for {type: String}
    description: String,
    date: String,
    duration: String,
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
