import mongoose from "mongoose";

import DATABASE_URI from "settings";

const URI = DATABASE_URI;

const DBConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database connected");
  } catch (err) {
    console.log(`Connection failed ${err}`);
  }
};

export default DBConnection;
