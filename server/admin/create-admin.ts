import { storage } from '../storage';
import * as readline from 'readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { pool } from '../db';

async function createAdmin() {
  console.log("--- Create Admin User ---");
  const rl = readline.createInterface({ input, output });
  let username = "";

  try {
    // The script will now fail here if dotenv-cli didn't work,
    // which confirms the .env file is the issue.
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL is not loaded. Please ensure the .env file exists in your project root (D:\\dee-inc\\.env) and contains the correct variable.");
    }

    username = await rl.question('Enter username: ');
    if (!username) {
      console.error("Username cannot be empty.");
      return;
    }

    const password = await rl.question('Enter password: ');
    if (!password) {
      console.error("Password cannot be empty.");
      return;
    }

    console.log(`Creating user "${username}"...`);
    const newUser = await storage.createUser({ username, password });
    console.log(`✅ Successfully created user: ${newUser.username} (ID: ${newUser.id})`);

  } catch (error: any) {
    if (error.code === '23505') {
        console.error(`Error: A user with the username "${username}" already exists.`);
    } else {
        console.error("Failed to create user:", error);
    }
  } finally {
    rl.close();
    await pool.end();
    console.log("Database connection closed. Script finished.");
  }
}

createAdmin();