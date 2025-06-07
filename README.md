# Our Love Story - Personal Photo Gallery

A cozy personal website showcasing a collection of photos and a surprise birthday comic strip. This project is built using React, Express, and PostgreSQL.

## Features

- **Photo Gallery**: Display and filter photos by category
- **Special Moments Timeline**: Highlight important moments in your relationship
- **Surprise Birthday Comic**: A special comic strip for her birthday
- **Admin Interface**: Easily add, edit, and delete photos and moments
- **Database Storage**: All data is stored in a PostgreSQL database for persistence

## How to Use

### Viewing the Website

1. Visit the main website to browse through photos and special moments.
2. Navigate using the menu at the top.
3. The Gallery page allows you to filter photos by category.
4. The Special Moments page shows a timeline of important events.
5. The Surprise page contains the birthday comic strip.

### Managing Photos and Content

With images now hosted on Google Cloud Storage (GCS), the workflow for adding and managing photos and moments is as follows:

**Workflow for Adding New Content:**

1.  **Upload Image Files to Google Cloud Storage (GCS):**
    *   Navigate to your GCS bucket (`deegallery-images`) in the Google Cloud Console.
    *   Inside the bucket, go into the appropriate folder (`photos/` for general gallery images, `moments/` for special moment images).
    *   Upload your new image file (e.g., `.jpg`, `.png`, `.webp`) directly to this GCS folder.

2.  **Obtain the Public GCS URL:**
    *   After uploading, select the image file in the GCS console.
    *   Copy its public URL. This typically looks like: `https://storage.googleapis.com/YOUR_BUCKET_NAME/photos/your-image.jpg` (replace `YOUR_BUCKET_NAME` with `deegallery-images`).

3.  **Create Database Entries via Admin Panel:**
    *   Navigate to your application's admin interface (e.g., `https://deeluvgallery.netlify.app/admin.html`).
    *   Create a new entry for the photo or special moment.
    *   When filling out the details, for the **URL** field, paste the full **public GCS URL** you copied in the previous step.
    *   Fill in other details like Title, Description, Category, Date, Tag, etc.
    *   Save the entry.

**Editing or Deleting Content:**

*   The admin interface at `/admin.html` also allows you to:
    *   Edit the details (title, description, URL, date, category, etc.) of any existing photo or moment. If you replace an image in GCS, you'll need to update its URL here if the name changed.
    *   Delete photos or moments from the database. (Note: This does not delete the image file from GCS; that must be done manually via the GCS console if desired).

**Important Note on Image URLs:**
The system now relies on full, absolute URLs from Google Cloud Storage (e.g., `https://storage.googleapis.com/deegallery-images/...`) being stored in the database. The frontend directly uses these URLs to display images.

## Development

This project is built using:

- **Frontend**: React, TailwindCSS, Framer Motion
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM

To start the application:

```bash
npm run dev
```

### Key Configuration for Frontend

-   **Backend API URL**: The frontend needs to know the base URL of the backend API to fetch data and images. This is configured using the `VITE_API_URL` environment variable.
    -   For local development, this is typically set in a `.env.development` file (e.g., `VITE_API_URL=http://localhost:5000`).
    -   For production (e.g., when deploying the frontend to Netlify and the backend to Render), this variable must be set in the frontend's build environment (e.g., Netlify environment variables) to point to the deployed backend URL (e.g., `VITE_API_URL=https://your-backend-api.onrender.com`).
-   **Image URLs**: Images are stored in Google Cloud Storage (GCS) and their full, absolute URLs (e.g., `https://storage.googleapis.com/deegallery-images/...`) are stored in the database. The frontend uses these URLs directly to display images. The `VITE_API_URL` is used for backend API calls, not for constructing these GCS image URLs.

## Customization

The website can be customized further by:

1. Editing the source code files
2. Changing the color scheme in the `index.css` file
3. Modifying text content in the respective page files
4. Updating the comic strip for special occasions