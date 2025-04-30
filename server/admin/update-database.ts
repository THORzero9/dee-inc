import { updateAllPhotos, updateAllMoments } from "./update-photos";

// Sample photos - Replace these URLs with your own
const myPhotos = [
  {
    title: "First Date Night",
    description: "Our first romantic dinner together",
    url: "/photos/first-date.jpg", // You'll upload this to /public/photos/
    category: "dates",
    date: "June 15, 2023"
  },
  {
    title: "Weekend Getaway",
    description: "That amazing weekend at the beach",
    url: "/photos/weekend-getaway.jpg",
    category: "trips",
    date: "July 8, 2023"
  },
  {
    title: "Coffee Date",
    description: "Just a regular day made special",
    url: "/photos/coffee-date.jpg",
    category: "everyday",
    date: "August 3, 2023"
  },
  {
    title: "Your Birthday",
    description: "Celebrating your special day",
    url: "/photos/birthday.jpg",
    category: "special",
    date: "September 12, 2023"
  },
  {
    title: "Movie Night",
    description: "Cozy evening with popcorn and movies",
    url: "/photos/movie-night.jpg",
    category: "everyday",
    date: "October 5, 2023"
  },
  {
    title: "Hiking Adventure",
    description: "That day we got lost but had the best time",
    url: "/photos/hiking.jpg",
    category: "trips",
    date: "November 18, 2023"
  },
  {
    title: "Anniversary Dinner",
    description: "Celebrating six months together",
    url: "/photos/anniversary.jpg",
    category: "dates",
    date: "December 15, 2023"
  },
  {
    title: "Holiday Season",
    description: "Our first holiday season together",
    url: "/photos/holiday.jpg",
    category: "special",
    date: "December 25, 2023"
  }
];

// Sample moments - Replace these with your own
const myMoments = [
  {
    title: "Where It All Began",
    description: "That nervous first meeting that turned into hours of conversation and laughter. Who knew this would be the start of something so special?",
    imageUrl: "/photos/first-meeting.jpg",
    date: "June 15, 2023",
    tag: "First Date",
    tagColor: "secondary"
  },
  {
    title: "Six Months Together",
    description: "Half a year of adventures, growth, and creating memories. This special dinner celebration marked how far we've come.",
    imageUrl: "/photos/six-months.jpg",
    date: "December 15, 2023",
    tag: "Anniversary",
    tagColor: "primary"
  },
  {
    title: "Our First Trip",
    description: "That spontaneous weekend getaway that taught us how well we travel together. Sunrise walks, local food, and making plans for future adventures.",
    imageUrl: "/photos/first-trip.jpg",
    date: "August 8, 2023",
    tag: "Travel",
    tagColor: "accent"
  },
  {
    title: "Meeting Our Friends",
    description: "When our worlds officially collided. That nerve-wracking but wonderful evening when our friend groups finally met and instantly connected.",
    imageUrl: "/photos/friends-meeting.jpg",
    date: "October 20, 2023",
    tag: "Celebration",
    tagColor: "secondary"
  }
];

async function updateDatabase() {
  console.log("Starting database update...");
  
  // Update photos
  console.log("Updating photos...");
  const photosUpdated = await updateAllPhotos(myPhotos);
  
  // Update moments
  console.log("Updating moments...");
  const momentsUpdated = await updateAllMoments(myMoments);
  
  if (photosUpdated && momentsUpdated) {
    console.log("Database update completed successfully!");
  } else {
    console.error("There were errors during the database update.");
  }
}

// Run the update
updateDatabase().catch(console.error);