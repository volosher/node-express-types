// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
export const collections: { favorites?: mongoDB.Collection } = {}
// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const favoritesCollection: mongoDB.Collection = db.collection(process.env.FAVORITES_COLLECTION_NAME);

  collections.favorites = favoritesCollection;

         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${favoritesCollection.collectionName}`);
 }

 async function applySchemaValidation(db: mongoDB.Db) {

    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "price"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                price: {
                    bsonType: "number",
                    description: "'price' is required and is a number",
                },
                },
        },
    };

    // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
        collMod: process.env.FAVORITES_COLLECTION_NAME,
        validator: jsonSchema
    }).catch(async (error: mongoDB.MongoServerError) => {
        if(error.codeName === 'NamespaceNotFound') {
            await db.createCollection(process.env.FAVORITES_COLLECTION_NAME, {validator: jsonSchema});
        }
    });

}