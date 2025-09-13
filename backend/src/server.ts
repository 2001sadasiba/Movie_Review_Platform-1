import apiRoutes from './api';
import express from "express";
import cors from 'cors'; // Import cors
import { config, Database } from "./config";

/**
 * Express app setup
 */
const app = express();

/**
 * CORS Configuration
 */
app.use(cors({
    origin: config.cors.corsOrigin, 
    credentials: config.cors.corsCredentials === 'true', 
}));

/**
 * Middleware
 */
app.use(express.json());

/**
 * Database connection
 */
const db = Database.getInstance();
db.connect().catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
});

/**
 * Mounting the API base path
 */
app.use('/api/v1', apiRoutes);

/**
 * Sample route
 */
app.get("/", (req, res) => {
    res.send("Movie Review Platform API is running");
});

/**
 * Start the server
 */
app.listen(config.server.port, () => {
    console.log(`Server running on port ${config.server.port}`);
    console.log(`CORS configured for origin: ${config.cors.corsOrigin}`);
});