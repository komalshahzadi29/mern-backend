import Project from "../models/Project.js";

const updateProjectByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, duration } = req.body;

    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID format"
      });
    }

    // Validate required fields
    if (!title && !description && !date && !duration) {
      return res.status(400).json({
        success: false,
        message: "At least one field (title, description, date, or duration) must be provided"
      });
    }

    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(date && { date }),
      ...(duration && { duration })
    };

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true,
        runValidators: true // Ensures updated data follows schema rules
      }
    );

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: `Project with ID ${id} not found`
      });
    }

    return res.json({
      success: true,
      message: `Project "${updatedProject.title}" updated successfully`,
      updatedItem: updatedProject
    });

  } catch (error) {
    console.error("Update error:", error);
    
    // Handle specific errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID format"
      });
    }
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

export default updateProjectByIdController;