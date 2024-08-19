import express, { Request, Response } from 'express';
import ideaRoutes from './routes/ideas-router';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Enable JSON parsing in the request body
app.use('/ideas', ideaRoutes); // Add this line to mount the Task API routes

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});