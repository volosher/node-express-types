import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "./services/database.service"
import { favoritesRouter } from "./routes/favorites.router"


dotenv.config();

const port = process.env.PORT || 6934;

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

connectToDatabase()
    .then(() => {
        app.use("/favorites", favoritesRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

