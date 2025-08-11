import Project from "../models/Project.js";

// Controller function
const addPortfolioController = async (req, res) => {
  try {
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required"
      });
    }

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date || new Date(),
      duration: req.body.duration || "1 week"
    });

    const savedProject = await project.save();
    
    return res.status(201).json({
      success: true,
      message: "Portfolio added successfully",
      data: savedProject
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Must export as default
export default addPortfolioController;