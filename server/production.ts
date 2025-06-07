import express from "express";
import session from 'express-session';
import passport from 'passport';
import connectPgSimple from 'connect-pg-simple';
import { registerRoutes } from "./routes";
import path from "path";
import { db, pool } from "./db"; // Modified to import pool
import { storage } from "./storage";
import './auth'; // For registering passport strategies
import { sql } from "drizzle-orm";

const app = express();

// Initialize database tables on startup
async function initializeDatabase() {
  try {
    console.log("Creating database tables...");
    
    // Create users table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create photos table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        url VARCHAR(500) NOT NULL,
        category VARCHAR(100),
        date VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create moments table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS moments (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        date VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log("Database tables created successfully!");
  } catch (error) {
    console.log("Database initialization error:", error);
  }
}

// Enable trust proxy for proper IP forwarding on Render
app.set('trust proxy', 1);

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Initialize database and start server
async function startServer() {
  await initializeDatabase();

  // Session Management Setup
  const PgStore = connectPgSimple(session);
  const sessionStore = new PgStore({
    pool: pool, // Ensure 'pool' is correctly imported and available
    tableName: 'user_sessions',
    createTableIfMissing: true,
  });

  app.use(session({
    store: sessionStore,
    secret: process.env.SESSION_SECRET || 'DEFEND_YOUR_CASTLE_WITH_A_STRONG_SECRET', // Fallback is insecure, user MUST set env var
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // Important for production over HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      sameSite: 'lax' // Recommended for CSRF protection
    }
  }));

  // Passport Initialization
  app.use(passport.initialize());
  app.use(passport.session());

  // Passport User Serialization and Deserialization
  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: number, done) => {
    try {
      // 'storage' should be imported from './storage'
      const user = await storage.getUser(Number(id)); 
      if (!user) return done(null, false);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
  
  // Register API routes
  await registerRoutes(app);

  // Serve static files in production
  const publicPath = path.join(process.cwd(), 'public');
  app.use('/public', express.static(publicPath)); // Restored

  // For production, serve a simple status page instead of the full frontend
  app.get('/', (req, res) => {
    res.json({ 
      message: "Photo Gallery API is running",
      status: "healthy",
      timestamp: new Date().toISOString()
    });
  });

  const PORT = parseInt(process.env.PORT || "3000");

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Production server running on port ${PORT}`);
  });
}

startServer().catch(console.error);