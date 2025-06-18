import express, { type Request, Response, NextFunction } from "express";
import session from 'express-session';
import passport from 'passport';
import './auth'; // Ensures LocalStrategy is registered
import connectPgSimple from 'connect-pg-simple';
import { pool } from "./db"; // Correctly importing the pg pool
import { storage } from "./storage"; // Importing storage for user serialization/deserialization
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

const app = express();
app.set('trust proxy', 1);

// CORS configuration to allow requests from your Netlify frontend
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:3000', // Local dev
    'http://localhost:5173', // Vite default dev port
    'https://deeluvgallery.netlify.app' // Your Netlify site
  ];
  
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

// Standard middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Management Setup
const PgStore = connectPgSimple(session);
app.use(session({
  store: new PgStore({
    pool: pool,
    tableName: 'user_sessions',
    createTableIfMissing: true,
  }),
  secret: process.env.SESSION_SECRET || 'a-default-dev-secret-that-is-not-secure',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    sameSite: 'none'
  }
}));

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport User Serialization/Deserialization
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  try {
    const user = await storage.getUser(Number(id));
    done(null, user || false);
  } catch (err) {
    done(err);
  }
});

// --- Server Startup Logic ---
(async () => {
  // Register all API routes from routes.ts
  const server = await registerRoutes(app);

  // General error handler
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // Differentiate between development and production
  if (process.env.NODE_ENV === "development") {
    // In development, setup Vite to serve the client
    log("Running in development mode, setting up Vite...");
    await setupVite(app, server);
  } else {
    // In production, the server is API-only. The client is on Netlify.
    // Add a root endpoint for health checks.
    app.get("/", (req, res) => {
      res.status(200).json({ status: "ok", message: "Dee Inc API is running" });
    });
    log("Running in production mode.");
  }

  // Use the PORT environment variable from Google Cloud Run, with a fallback for local dev
  const port = process.env.PORT || 8080;
  
  server.listen({
    port: Number(port),
    host: "0.0.0.0", // Listen on all network interfaces
  }, () => {
    log(`Server listening on port ${port}`);
  });
})();
