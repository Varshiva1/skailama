// index.js
import express from 'express';
import connectDB from './db.js';
import cors from 'cors'; 
import userRoutes from './routes/userRoutes.js';

app.get("/", (req, res) => res.send("Express on Vercel"));

const app = express();
connectDB();

app.use(express.json());
app.use(cors()); 
 
app.use('/api', userRoutes);
// app.use('/api', discussionRoutes);
console.log('Routes registered');
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
