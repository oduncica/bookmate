import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connexion à MongoDB réussie !");
  } catch (error) {
    console.error("Connexion à MongoDB échouée !", error.message);
    process.exit(1); // Arrête l'application en cas d'échec de connexion
  }
};
