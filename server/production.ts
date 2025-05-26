import express from "express";
import { registerRoutes } from "./routes";
import path from "path";

const app = express();

// Enable trust proxy for proper IP forwarding on Render
app.set('trust proxy', 1);

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Register API routes
registerRoutes(app);

// Serve static files in production
const publicPath = path.join(process.cwd(), 'public');
app.use('/public', express.static(publicPath));

// For production, serve a simple status page instead of the full frontend
app.get('/', (req, res) => {
  res.json({ 
    message: "Photo Gallery API is running",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running on port ${PORT}`);
});