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
    // console.log("DatabaseStorage.initializeData: System configured for manual data population via admin panel. No sample data will be automatically added.");
    // This method is called on server startup if the database tables are empty.
    // By leaving this empty, a new database will start without any sample photos or moments.
    // All content should be added manually through the admin interface after uploading image files.
  }
}

// Create and initialize storage
export const storage = new DatabaseStorage();
// We'll run the initialization in the routes file to ensure tables are created first
