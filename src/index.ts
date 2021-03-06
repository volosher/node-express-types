import dotenv from "dotenv";
import express from "express";
import cors from 'cors';
import { connectToDatabase } from "./services/database.service"
import { favoritesRouter } from "./routes/favorites.router"


dotenv.config();


const PORT = process.env.PORT || '8080';

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

connectToDatabase()
    .then(() => {
        app.use("/favorites", favoritesRouter);

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

