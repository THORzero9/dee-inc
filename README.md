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

1. The admin interface is available at `/admin.html`.
2. Here you can add new photos or special moments.
3. Upload your photos to the appropriate folder:
   - For Gallery: `/public/photos/`
   - For Moments: `/public/moments/`
4. Fill out the form with details about the photo:
   - Title
   - Description
   - URL (path to the photo, e.g., `/photos/your-photo.jpg`)
   - Category (for Gallery photos)
   - Date
5. You can also edit existing photos by clicking the "Edit" button.
6. To delete a photo, click the "Delete" button.

## Development

This project is built using:

- **Frontend**: React, TailwindCSS, Framer Motion
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM

To start the application:

```bash
npm run dev
```

## Customization

The website can be customized further by:

1. Editing the source code files
2. Changing the color scheme in the `index.css` file
3. Modifying text content in the respective page files
4. Updating the comic strip for special occasions