"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_service_1 = require("./services/database.service");
const favorites_router_1 = require("./routes/favorites.router");
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use("/favorites", favorites_router_1.favoritesRouter);
    app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
// // interface favorites {
// //     name: string;
// //     price: number;
// // }
// interface FavoritesDocument {
//     _id: number;
//     [keys: string]: any
//   }
//   const uri = "mongodb+srv://testUser:testUser12345@testbase.tsex3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//   const client = new MongoClient(uri);
// // mongo db
// async function main(){
//        try {
//         // Connect to the MongoDB cluster
//         await client.connect();
//         // Make the appropriate DB calls
//         await  createListing(client, {
//             _id: 1,
//             name: "TestName1",
//             price: 456,
//         });
//     } catch (e) {
//         console.error(e);
//     } finally {
//         await client.close();
//     }
// }
// main().catch(console.error);
// async function listDatabases(client: MongoClient){
//     const databasesList = await client.db().admin().listDatabases();
//     console.log("Databases:");
//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));
// };
// async function createListing(client: MongoClient, newListing: FavoritesDocument){
//     const result = await client.db("favorites_base").collection<FavoritesDocument>("favorites").insertOne(newListing);
//     console.log(`New listing created with the following id: ${result.insertedId}`);
// }
// dotenv.config();
// const port = process.env.SERVER_PORT;
// const app = express();
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
// app.get("/", (req: express.Request, res: express.Response) => {
//     res.send('server say Hello')
// });
// app.get("/favorites/:id", (req: express.Request, res: express.Response) => {
//     const id = req.params.id
//     res.send(`You get favorites by id = ${id}`)
// })
// app.get("/favorites", (req: express.Request, res: express.Response) => {
//     try {
//         const result = (await client.db("favorites_base").collection<FavoritesDocument>.find({}))
//         res.status(200).send(result)
//     }
//     catch(error) {
//         res.status(500).send(error.message)
//     }
//     // res.send('You get all favorites')
//     })
// app.post('/favorites', (req: express.Request, res: express.Response) => {
//     if (!req.body) return res.sendStatus(400)
//   console.log(req.body)
//   res.send(`Got a POST request `)
// //   res.send(req.body)
// })
// app.put("/favorites/:id", (req: express.Request, res: express.Response) => {
//     const id = req.params.id
//     res.send('Got a PUT request')
// })
// app.delete("/favorites/:id", (req: express.Request, res: express.Response) => {
//     const id = req.params.id
//     res.send('Got a Delete request')
// })
// // start the express server
// app.listen(port, () => {
//     console.log(`server started at http://localhost:${port}`);
// });
//# sourceMappingURL=index.js.map