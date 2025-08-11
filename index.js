import express from 'express';
import cors from 'cors';
import { 
  addPortfolioController,
  getAllProjectsController,
  getProjectByIdController,
  deleteProjectByIdController,
  updateProjectByIdController
} from './controllers/index.js';
import connectToMongoDB from './config/connectToMongoDB.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
connectToMongoDB()
  .then(() => {
    console.log('✅ MongoDB connected');
    
    // Routes
    app.get('/', (req, res) => res.send('Hello World!'));
    app.get('/about', (req, res) => res.send('<h1>About Page</h1>'));
    app.get('/contact', (req, res) => res.json({ name: 'salman', age: 22, city: 'karachi' }));

    // API Routes
    app.post('/api/add-portfolio', addPortfolioController);
    app.get('/api/get-all-projects', getAllProjectsController);
    app.get('/api/get-project/:id', getProjectByIdController);
    app.delete('/api/delete-project/:id', deleteProjectByIdController);
    app.put('/api/update-project/:id', updateProjectByIdController);

    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });