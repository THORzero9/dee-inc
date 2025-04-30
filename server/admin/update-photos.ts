import { db } from "../db";
import { photos, moments, insertPhotoSchema, insertMomentSchema } from "@shared/schema";
import { eq } from "drizzle-orm";

/**
 * This script helps you update the photos and moments in the database.
 * You can use this to replace the sample photos with your own photos.
 */

// Update all photos at once
export async function updateAllPhotos(newPhotos: any[]) {
  try {
    // Delete all existing photos
    await db.delete(photos);
    
    // Insert new photos
    for (const photo of newPhotos) {
      const validatedPhoto = insertPhotoSchema.parse(photo);
      await db.insert(photos).values(validatedPhoto);
    }
    
    console.log("Successfully updated all photos!");
    return true;
  } catch (error) {
    console.error("Error updating photos:", error);
    return false;
  }
}

// Update all moments at once
export async function updateAllMoments(newMoments: any[]) {
  try {
    // Delete all existing moments
    await db.delete(moments);
    
    // Insert new moments
    for (const moment of newMoments) {
      const validatedMoment = insertMomentSchema.parse(moment);
      await db.insert(moments).values(validatedMoment);
    }
    
    console.log("Successfully updated all moments!");
    return true;
  } catch (error) {
    console.error("Error updating moments:", error);
    return false;
  }
}

// Add a new photo
export async function addPhoto(photo: any) {
  try {
    const validatedPhoto = insertPhotoSchema.parse(photo);
    await db.insert(photos).values(validatedPhoto);
    console.log("Successfully added new photo!");
    return true;
  } catch (error) {
    console.error("Error adding photo:", error);
    return false;
  }
}

// Add a new moment
export async function addMoment(moment: any) {
  try {
    const validatedMoment = insertMomentSchema.parse(moment);
    await db.insert(moments).values(validatedMoment);
    console.log("Successfully added new moment!");
    return true;
  } catch (error) {
    console.error("Error adding moment:", error);
    return false;
  }
}

// Delete a photo by ID
export async function deletePhoto(id: number) {
  try {
    await db.delete(photos).where(eq(photos.id, id));
    console.log(`Successfully deleted photo with ID ${id}!`);
    return true;
  } catch (error) {
    console.error(`Error deleting photo with ID ${id}:`, error);
    return false;
  }
}

// Delete a moment by ID
export async function deleteMoment(id: number) {
  try {
    await db.delete(moments).where(eq(moments.id, id));
    console.log(`Successfully deleted moment with ID ${id}!`);
    return true;
  } catch (error) {
    console.error(`Error deleting moment with ID ${id}:`, error);
    return false;
  }
}