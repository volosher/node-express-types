// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Favorites from "../models/favorites";
// Global Config
export const favoritesRouter = express.Router();

// favoritesRouter.use(express.json());
// GET
favoritesRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const favorites = (await collections.favorites.find({}).toArray()) as Favorites[];

        res.status(200).send(favorites);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

favoritesRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {

        const query = { _id: new ObjectId(id) };
        const favorites = (await collections.favorites.findOne(query)) as Favorites;

        if (favorites) {
            res.status(200).send(favorites);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});
// POST
favoritesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newFavorite = req.body as Favorites;
        const result = await collections.favorites.insertOne(newFavorite);

        result
            ? res.status(201).send(`Successfully created a new Favorite with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new Favorite.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// PUT

favoritesRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedFavorite: Favorites = req.body as Favorites;
        const query = { _id: new ObjectId(id) };

        const result = await collections.favorites.updateOne(query, { $set: updatedFavorite });

        result
            ? res.status(200).send(`Successfully updated Favorite with id ${id}`)
            : res.status(304).send(`Favorite with id: ${id} not updated`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

// DELETE

favoritesRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.favorites.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed Favorite with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove Favorite with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Favorite with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});