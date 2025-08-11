const express = require('express');
const router = express.Router();
const {
  addPortfolioController,
  getAllProjectsController,
  getProjectByIdController,
  deleteProjectByIdController,
  updateProjectByIdController
} = require('../controllers');

// CRUD Routes
router.post('/add-portfolio', addPortfolioController);
router.get('/get-all-projects', getAllProjectsController);
router.get('/get-project/:id', getProjectByIdController);
router.delete('/delete-project/:id', deleteProjectByIdController);
router.put('/update-project/:id', updateProjectByIdController);

module.exports = router;