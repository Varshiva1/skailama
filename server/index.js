import express from 'express';
import connectDB from './db.js';
import cors from 'cors'; 
import userRoutes from './routes/userRoutes.js';

const app = express(); 


connectDB();
app.use(express.json());
app.use(cors()); 

app.use('/api', userRoutes);
app.get("/", (req, res) => res.send("Express on Vercel"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;  
