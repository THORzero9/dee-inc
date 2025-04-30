// This is a simple script that helps you run the update-database.ts file
// to update your photos and moments in the database.

console.log("Starting the photo update script...");
console.log("This will update your photos and moments in the database.");

import("tsx")
  .then(() => {
    console.log("Running the update script...");
    import("./server/admin/update-database.ts")
      .catch(error => {
        console.error("Error running the update script:", error);
      });
  })
  .catch(error => {
    console.error("Error importing tsx:", error);
  });