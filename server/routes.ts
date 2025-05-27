import type { Express, Request, Response, NextFunction } from "express";
import passport from 'passport';
import { isAuthenticated } from './auth';
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import * as schema from "@shared/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

export async function registerRoutes(app: Express): Promise<Server> {
  try {
    // Initialize database and sample data
    const dbStorage = storage as any;
    if (typeof dbStorage.initializeData === 'function') {
      console.log("[express] Initializing database with sample data...");
      await dbStorage.initializeData();
      console.log("[express] Database initialized successfully.");
    }
  } catch (error) {
    console.error("[express] Error initializing database:", error);
  }

  // Authentication routes
  app.post('/api/auth/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: Error, user: any, info: any) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ success: false, message: info.message || 'Login failed' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        // Ensure req.user is typed correctly or use 'any' if types are complex here
        const authenticatedUser = req.user as { id: number; username: string; } | undefined;
        return res.json({ success: true, user: { id: authenticatedUser?.id, username: authenticatedUser?.username } });
      });
    })(req, res, next);
  });

  app.post('/api/auth/logout', (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      // req.session.destroy is a method from express-session
      // We need to ensure that req.session is available and has this method.
      // Express.Request needs to be augmented, or we cast req to any or a more specific type.
      // For now, assuming types are handled or will be addressed by environment.
      if (req.session) {
        req.session.destroy((destroyErr) => {
          if (destroyErr) {
            // Log error but still try to send response
            console.error('Session destruction error:', destroyErr);
            return next(destroyErr); 
          }
          res.clearCookie('connect.sid'); // Default session cookie name, adjust if changed
          res.json({ success: true, message: 'Logged out successfully' });
        });
      } else {
        // Fallback if session is not available, though with proper setup it should be.
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'Logged out successfully (session not found)' });
      }
    });
  });

  app.get('/api/auth/status', (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      // Ensure req.user is typed correctly
      const authenticatedUser = req.user as { id: number; username: string; };
      res.json({ isAuthenticated: true, user: { id: authenticatedUser.id, username: authenticatedUser.username } });
    } else {
      res.json({ isAuthenticated: false });
    }
  });

  // API routes - Photo endpoints
  app.get("/api/photos", async (req, res) => {
    try {
      const photos = await storage.getAllPhotos();
      res.json(photos);
    } catch (error) {
      console.error("Error fetching photos:", error);
      res.status(500).json({ message: "Failed to fetch photos" });
    }
  });

  app.get("/api/photos/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const photo = await storage.getPhoto(id);
      
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
      
      res.json(photo);
    } catch (error) {
      console.error("Error fetching photo:", error);
      res.status(500).json({ message: "Failed to fetch photo" });
    }
  });
  
  // Add new photo
  app.post("/api/photos", isAuthenticated, async (req, res) => {
    try {
      const photo = req.body;
      const newPhoto = await storage.createPhoto(photo);
      res.status(201).json(newPhoto);
    } catch (error) {
      console.error("Error creating photo:", error);
      res.status(500).json({ message: "Failed to create photo" });
    }
  });
  
  // Delete photo
  app.delete("/api/photos/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // First check if photo exists
      const photo = await storage.getPhoto(id);
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
      
      await storage.deletePhoto(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting photo:", error);
      res.status(500).json({ message: "Failed to delete photo" });
    }
  });
  
  // Update photo
  app.put("/api/photos/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      // First check if photo exists
      const photo = await storage.getPhoto(id);
      if (!photo) {
        return res.status(404).json({ message: "Photo not found" });
      }
      
      const updatedPhoto = await storage.updatePhoto(id, updateData);
      res.json(updatedPhoto);
    } catch (error) {
      console.error("Error updating photo:", error);
      res.status(500).json({ message: "Failed to update photo" });
    }
  });

  // Special moments endpoints
  app.get("/api/moments", async (req, res) => {
    try {
      const moments = await storage.getAllMoments();
      res.json(moments);
    } catch (error) {
      console.error("Error fetching moments:", error);
      res.status(500).json({ message: "Failed to fetch moments" });
    }
  });

  app.get("/api/moments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const moment = await storage.getMoment(id);
      
      if (!moment) {
        return res.status(404).json({ message: "Moment not found" });
      }
      
      res.json(moment);
    } catch (error) {
      console.error("Error fetching moment:", error);
      res.status(500).json({ message: "Failed to fetch moment" });
    }
  });
  
  // Add new moment
  app.post("/api/moments", isAuthenticated, async (req, res) => {
    try {
      const moment = req.body;
      const newMoment = await storage.createMoment(moment);
      res.status(201).json(newMoment);
    } catch (error) {
      console.error("Error creating moment:", error);
      res.status(500).json({ message: "Failed to create moment" });
    }
  });
  
  // Delete moment
  app.delete("/api/moments/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      // First check if moment exists
      const moment = await storage.getMoment(id);
      if (!moment) {
        return res.status(404).json({ message: "Moment not found" });
      }
      
      await storage.deleteMoment(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting moment:", error);
      res.status(500).json({ message: "Failed to delete moment" });
    }
  });
  
  // Update moment
  app.put("/api/moments/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = req.body;
      
      // First check if moment exists
      const moment = await storage.getMoment(id);
      if (!moment) {
        return res.status(404).json({ message: "Moment not found" });
      }
      
      const updatedMoment = await storage.updateMoment(id, updateData);
      res.json(updatedMoment);
    } catch (error) {
      console.error("Error updating moment:", error);
      res.status(500).json({ message: "Failed to update moment" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
