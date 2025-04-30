import type { Express } from "express";
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
  app.post("/api/photos", async (req, res) => {
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
  app.delete("/api/photos/:id", async (req, res) => {
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
  app.post("/api/moments", async (req, res) => {
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
  app.delete("/api/moments/:id", async (req, res) => {
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

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
