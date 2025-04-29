import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
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

  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
