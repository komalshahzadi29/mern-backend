import Project from "../models/Project.js";

const getAllProjectsController = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 }); // Newest first
    
    if (projects.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No projects found",
        projects: []
      });
    }

    return res.json({
      success: true,
      count: projects.length,
      projects: projects
    });

  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching projects",
      error: error.message
    });
  }
};

export default getAllProjectsController;  // Default export