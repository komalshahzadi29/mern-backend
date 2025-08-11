import Project from "../models/Project.js";

const getProjectByIdController = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID format"
      });
    }

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found`
      });
    }

    return res.json({
      success: true,
      message: `Project "${project.title}" fetched successfully`,
      projectDetails: project
    });

  } catch (error) {
    console.error("Error fetching project:", error);
    
    // Handle specific MongoDB errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID format"
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export default getProjectByIdController;