import { drizzle } from "drizzle-orm/expo-sqlite";
import { deleteDatabaseAsync, openDatabaseSync } from "expo-sqlite/next";

let expo = openDatabaseSync("db.db");

// if (expo) {
//     deleteDatabaseAsync("db.db")
//     console.log("Database Deleted")
//     expo = openDatabaseSync("db.db")
// }

export const db = drizzle(expo);