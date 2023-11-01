import dotenv from "dotenv";

dotenv.config();

export const DATABASE_URI = process.env.DATABASE_URI || "";
export const SECRET_TOKEN = process.env.SECRET_TOKEN || "";
