import { getDatabase } from "firebase/database";
import { app } from "../firebase/app";

export const db = getDatabase(app);