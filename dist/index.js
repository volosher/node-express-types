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
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use("/favorites", favorites_router_1.favoritesRouter);
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map