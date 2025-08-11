import Project from "../models/Project.js";

const deleteProjectByIdController = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate MongoDB ID format
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID format"
            });
        }

        const deletedItem = await Project.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({
                success: false,
                message: `Project with ID ${id} not found`
            });
        }

        return res.json({
            success: true,
            message: `Project "${deletedItem.title}" deleted successfully`,
            deletedItem: deletedItem
        });

    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error during deletion",
            error: error.message
        });
    }
};

export default deleteProjectByIdController;  // Default export added here