import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// public routes
app.use('/api/auth', authRoutes);
// protected routes 
app.use('/api/user', userRoutes); 

//ping route
app.get('/ping', (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString()
  });
});

export default app;
