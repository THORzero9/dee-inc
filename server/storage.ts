import bcrypt from 'bcrypt';
import { users, photos, moments, type User, type InsertUser, type Photo, type InsertPhoto, type Moment, type InsertMoment } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface remains the same
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Photo methods
  getAllPhotos(): Promise<Photo[]>;
  getPhoto(id: number): Promise<Photo | undefined>;
  createPhoto(photo: InsertPhoto): Promise<Photo>;
  updatePhoto(id: number, photo: Partial<InsertPhoto>): Promise<Photo>;
  deletePhoto(id: number): Promise<void>;
  
  // Moment methods
  getAllMoments(): Promise<Moment[]>;
  getMoment(id: number): Promise<Moment | undefined>;
  createMoment(moment: InsertMoment): Promise<Moment>;
  updateMoment(id: number, moment: Partial<InsertMoment>): Promise<Moment>;
  deleteMoment(id: number): Promise<void>;
}

// DatabaseStorage implementation using PostgreSQL/Drizzle
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const saltRounds = 10; // Or another appropriate number
    const hashedPassword = await bcrypt.hash(insertUser.password, saltRounds);
    
    const [user] = await db
      .insert(users)
      .values({
        username: insertUser.username,
        password: hashedPassword, // Store the hashed password
      })
      .returning();
    return user;
  }

  // Photo methods
  async getAllPhotos(): Promise<Photo[]> {
    return await db.select().from(photos);
  }

  async getPhoto(id: number): Promise<Photo | undefined> {
    const [photo] = await db.select().from(photos).where(eq(photos.id, id));
    return photo || undefined;
  }

  async createPhoto(insertPhoto: InsertPhoto): Promise<Photo> {
    const [photo] = await db
      .insert(photos)
      .values(insertPhoto)
      .returning();
    return photo;
  }
  
  async updatePhoto(id: number, updateData: Partial<InsertPhoto>): Promise<Photo> {
    const [updatedPhoto] = await db
      .update(photos)
      .set(updateData)
      .where(eq(photos.id, id))
      .returning();
    return updatedPhoto;
  }
  
  async deletePhoto(id: number): Promise<void> {
    await db.delete(photos).where(eq(photos.id, id));
  }

  // Moment methods
  async getAllMoments(): Promise<Moment[]> {
    return await db.select().from(moments);
  }

  async getMoment(id: number): Promise<Moment | undefined> {
    const [moment] = await db.select().from(moments).where(eq(moments.id, id));
    return moment || undefined;
  }

  async createMoment(insertMoment: InsertMoment): Promise<Moment> {
    const [moment] = await db
      .insert(moments)
      .values(insertMoment)
      .returning();
    return moment;
  }
  
  async updateMoment(id: number, updateData: Partial<InsertMoment>): Promise<Moment> {
    const [updatedMoment] = await db
      .update(moments)
      .set(updateData)
      .where(eq(moments.id, id))
      .returning();
    return updatedMoment;
  }
  
  async deleteMoment(id: number): Promise<void> {
    await db.delete(moments).where(eq(moments.id, id));
  }

  // Initialize with sample data if tables are empty
  async initializeData() {
    // Check if photos table is empty
    const existingPhotos = await db.select().from(photos);
    if (existingPhotos.length === 0) {
      // Sample photos
      const samplePhotos: InsertPhoto[] = [
        {
          title: "First Date Night",
          description: "Our first romantic dinner together",
          url: "https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&w=800&q=80",
          category: "dates",
          date: "2023-06-15"
        },
        {
          title: "Weekend Getaway",
          description: "That amazing weekend at the beach",
          url: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=800&q=80",
          category: "trips",
          date: "2023-07-08"
        },
        {
          title: "Coffee Date",
          description: "Just a regular day made special",
          url: "https://images.unsplash.com/photo-1536854150886-354a3b64b8c3?auto=format&fit=crop&w=800&q=80",
          category: "everyday",
          date: "2023-08-03"
        },
        {
          title: "Your Birthday",
          description: "Celebrating your special day",
          url: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?auto=format&fit=crop&w=800&q=80",
          category: "special",
          date: "2023-09-12"
        },
        {
          title: "Movie Night",
          description: "Cozy evening with popcorn and movies",
          url: "https://images.unsplash.com/photo-1623244307563-f9ade3df8445?auto=format&fit=crop&w=800&q=80",
          category: "everyday",
          date: "2023-10-05"
        },
        {
          title: "Hiking Adventure",
          description: "That day we got lost but had the best time",
          url: "https://images.unsplash.com/photo-1682687219800-bba120d709c5?auto=format&fit=crop&w=800&q=80",
          category: "trips",
          date: "2023-11-18"
        },
        {
          title: "Anniversary Dinner",
          description: "Celebrating six months together",
          url: "https://images.unsplash.com/photo-1605147087660-73ea804cef95?auto=format&fit=crop&w=800&q=80",
          category: "dates",
          date: "2023-12-15"
        },
        {
          title: "Holiday Season",
          description: "Our first holiday season together",
          url: "https://images.unsplash.com/photo-1573676564541-6e4550eb4545?auto=format&fit=crop&w=800&q=80",
          category: "special",
          date: "2023-12-25"
        }
      ];

      // Add sample photos
      for (const photo of samplePhotos) {
        await this.createPhoto(photo);
      }
    }

    // Check if moments table is empty
    const existingMoments = await db.select().from(moments);
    if (existingMoments.length === 0) {
      // Sample moments
      const sampleMoments: InsertMoment[] = [
        {
          title: "Where It All Began",
          description: "That nervous first meeting that turned into hours of conversation and laughter. Who knew this would be the start of something so special?",
          imageUrl: "https://images.unsplash.com/photo-1583878545136-516b9f517bfb?auto=format&fit=crop&w=800&q=80",
          date: "2023-06-15",
          tag: "First Date",
          tagColor: "secondary"
        },
        {
          title: "Six Months Together",
          description: "Half a year of adventures, growth, and creating memories. This special dinner celebration marked how far we've come.",
          imageUrl: "https://images.unsplash.com/photo-1515446134809-993c501ca304?auto=format&fit=crop&w=800&q=80",
          date: "2023-12-15",
          tag: "Anniversary",
          tagColor: "primary"
        },
        {
          title: "Our First Trip",
          description: "That spontaneous weekend getaway that taught us how well we travel together. Sunrise walks, local food, and making plans for future adventures.",
          imageUrl: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?auto=format&fit=crop&w=800&q=80",
          date: "2023-08-08",
          tag: "Travel",
          tagColor: "accent"
        },
        {
          title: "Meeting Our Friends",
          description: "When our worlds officially collided. That nerve-wracking but wonderful evening when our friend groups finally met and instantly connected.",
          imageUrl: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?auto=format&fit=crop&w=800&q=80",
          date: "2023-10-20",
          tag: "Celebration",
          tagColor: "secondary"
        }
      ];

      // Add sample moments
      for (const moment of sampleMoments) {
        await this.createMoment(moment);
      }
    }
  }
}

// Create and initialize storage
export const storage = new DatabaseStorage();
// We'll run the initialization in the routes file to ensure tables are created first
