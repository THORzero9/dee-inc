import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFullImageUrl(relativePath: string | undefined | null): string {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (!relativePath) {
    // Return a placeholder or an empty string if no path is provided
    // console.warn("getFullImageUrl called with no relativePath");
    return ""; // Or path to a default placeholder image if you have one
  }
  // If relativePath is already a full URL (e.g. from Unsplash in sample data), return it directly
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }
  // Ensure we don't have double slashes if relativePath starts with / and apiUrl ends with /
  return `${apiUrl.replace(/\/$/, '')}${relativePath.startsWith('/') ? relativePath : '/' + relativePath}`;
}
