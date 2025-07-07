[![Netlify Status](https://api.netlify.com/api/v1/badges/11475363-6ad3-4d6f-99b2-4b324c9a84d0/deploy-status)](https://app.netlify.com/projects/deeluvgallery/deploys)
# Our Love Story - Personal Photo Gallery

A beautiful, modern personal website showcasing a collection of photos, special moments, and a surprise birthday comic strip. This full-stack application features a React frontend with TypeScript and an Express.js backend, deployed with a modern cloud architecture.

## ✨ Features

### 🏠 **Homepage**
- Welcoming introduction with romantic design elements
- Beautiful hero section with couple's photo
- Responsive layout with decorative animations

### 📸 **Photo Gallery** 
- Interactive photo gallery with category filtering
- Categories: All Photos, Date Nights, Trips, Everyday, Special
- Lightbox view for enlarged photo viewing
- Smooth animations and responsive grid layout

### 💕 **Special Moments Timeline**
- Chronological timeline of important relationship milestones
- Tagged moments: First Date, Anniversary, Travel, Celebration
- Interactive timeline with alternating left/right layout
- Each moment includes photo, description, and date

### 🎁 **Surprise Birthday Comic**
- Interactive reveal animation for special occasions
- Custom comic strip display with decorative elements
- Download functionality for the comic strip
- Animated gift box reveal experience

### 🔐 **Admin Interface**
- Secure authentication system using Passport.js
- Easy content management for photos and moments
- Add, edit, and delete functionality
- Separate admin panel at `/admin.html`

### 🎨 **Design & UX**
- Modern, romantic design with custom fonts (Caveat, Poppins, Sue Ellen Francisco)
- TailwindCSS with custom color scheme
- Framer Motion animations throughout
- Fully responsive design for all devices
- shadcn/ui component library integration

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling and development server
- **TailwindCSS** for styling with custom design system
- **shadcn/ui** component library
- **Framer Motion** for animations
- **TanStack Query** for server state management
- **Wouter** for client-side routing
- **Lucide React** for icons

### Backend
- **Express.js** with TypeScript
- **Node.js** runtime
- **PostgreSQL** database
- **Drizzle ORM** for database operations
- **Passport.js** for authentication
- **Express Session** with PostgreSQL store
- **bcrypt** for password hashing

### Deployment & Infrastructure
- **Frontend**: Deployed on Netlify
- **Backend API**: Deployed on Google Cloud Run
- **Database**: PostgreSQL (cloud-hosted)
- **Build**: Google Cloud Build for CI/CD
- **Static Assets**: Served via Google Cloud Run

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Environment Variables
Create a `.env` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_secure_session_secret
NODE_ENV=development
```

### Installation & Development

1. **Clone and install dependencies:**
```bash
git clone <repository-url>
cd dee-inc
npm install
```

2. **Set up the database:**
```bash
# Generate migration files
npm run db:generate

# Run migrations
npm run db:migrate
```

3. **Create an admin user:**
```bash
npm run create-admin
```

4. **Start development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:8080` with hot reload enabled.

## 📁 Project Structure

```
dee-inc/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components (Home, Gallery, etc.)
│   │   ├── lib/           # Utilities and configurations
│   │   ├── hooks/         # Custom React hooks
│   │   └── assets/        # Static assets
│   ├── public/           # Static admin interface
│   └── index.html        # Main HTML template
├── server/               # Backend Express application
│   ├── routes.ts         # API route definitions
│   ├── auth.ts          # Authentication logic
│   ├── db.ts            # Database connection
│   ├── storage.ts       # Data access layer
│   └── admin/           # Admin user management
├── shared/              # Shared TypeScript schemas
├── migrations/          # Database migration files
├── public/             # Local static files (admin interface)
└── attached_assets/    # Additional project assets

Note: Photos and moment images are stored in Google Cloud Storage buckets, not local directories.
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build both client and server for production
- `npm run build:client` - Build only the frontend
- `npm run build:server` - Build only the backend
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migration files
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run create-admin` - Create admin user account
- `npm run check` - Type check TypeScript files

## 📝 Content Management

### Adding Photos (Gallery)
1. **Upload to GCP Bucket**: First, upload your photo files to the Google Cloud Storage bucket
2. **Copy Image URL**: Copy the public URL of the uploaded image from the GCP bucket
3. **Access Admin Panel**: Go to the admin interface at `/admin.html`
4. **Login**: Use your admin credentials to access the panel
5. **Add New Photo**: Use the "Add Photo" form with:
   - Title and description
   - **Image URL**: Paste the GCP bucket URL (e.g., `https://storage.googleapis.com/your-bucket/photo.webp`)
   - Category (dates, trips, everyday, special)
   - Date

### Adding Special Moments
1. **Upload to GCP Bucket**: Upload your moment images to the Google Cloud Storage bucket
2. **Copy Image URL**: Copy the public URL of the uploaded image
3. **Use Admin Interface**: Add moments with:
   - Title and description
   - **Image URL**: Paste the GCP bucket URL
   - Date
   - Tag (First Date, Anniversary, Travel, Celebration)
   - Tag color for theming

### Updating the Comic Strip
- Replace `/client/src/assets/comic-strip.jpeg` with your custom comic
- The Surprise page will automatically use the new image

## 🚀 Deployment

### Netlify (Frontend)
The frontend automatically deploys to Netlify when code is pushed to the main branch:
- Build command: `npm run build:client`
- Publish directory: `dist/public`
- API routes proxy to Google Cloud Run backend

### Google Cloud Run (Backend)
The backend API deploys to Google Cloud Run via Cloud Build:
- Automated deployment on push
- Environment variables managed via Secret Manager
- Database migrations run during build process

### Google Cloud Storage (Images)
Images are stored in Google Cloud Storage buckets:
- Create a GCP bucket for photo storage
- Configure public read access for images
- Upload photos/moments to the bucket
- Use the bucket URLs in the admin panel

## 🎨 Customization

### Design Customization
- **Colors**: Modify CSS variables in `/client/src/index.css`
- **Fonts**: Update font imports and classes in the same file
- **Components**: Customize shadcn/ui components in `/client/src/components/ui/`

### Content Customization
- **Homepage**: Edit `/client/src/pages/Home.tsx`
- **Navigation**: Modify `/client/src/components/Header.tsx`
- **Footer**: Update `/client/src/components/Footer.tsx`

### Database Schema
- **Modify**: Update `/shared/schema.ts`
- **Migrate**: Run `npm run db:generate` and `npm run db:migrate`

## 📸 Photo Optimization & Storage

### Image Optimization
For best performance, optimize images before uploading to GCP bucket:
- Use WebP format when possible
- Compress images to reduce file size
- Maintain aspect ratios for consistent layout
- Use descriptive filenames for better organization

### GCP Storage Workflow
1. **Upload**: Upload optimized images to your Google Cloud Storage bucket
2. **Set Public Access**: Ensure images have public read access
3. **Copy URL**: Copy the public URL (format: `https://storage.googleapis.com/bucket-name/image-name.webp`)
4. **Use in Admin**: Paste the URL when creating photos/moments in admin panel

## 💝 Features in Detail

This application was built as a personal love story website, featuring:
- **Romantic Design**: Custom color palette with soft, warm tones
- **Interactive Elements**: Hover effects, animations, and transitions
- **Personal Touch**: Hand-crafted comic strip and personal photos
- **Mobile-First**: Fully responsive design for all devices
- **Performance**: Optimized images and efficient code splitting

Perfect for couples wanting to showcase their journey together with a modern, professional web presence!