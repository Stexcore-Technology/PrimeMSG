/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Express HTTP server when building for production.
 *
 * Learn more about Node.js server integrations here:
 * - https://qwik.dev/docs/deployments/node/
 *
 */
import express, { Express } from 'express';
import { createQwikCity, type PlatformNode } from "@builder.io/qwik-city/middleware/node";
import "dotenv/config";
import qwikCityPlan from "@qwik-city-plan";
import { manifest } from "@qwik-client-manifest";
import render from "../entry.ssr";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

declare global {
    interface QwikCityPlatform extends PlatformNode {}
}

export default new class Server {
    private app: Express;
    private PORT: number | string;
    private distDir: string;
    private buildDir: string;

    constructor() {
        this.app = express();
        
        // Allow for dynamic port
        this.PORT = process.env.PORT ?? 3000;

        // Directories where the static assets are located
        this.distDir = join(fileURLToPath(import.meta.url), "..", "..", "dist");
        this.buildDir = join(this.distDir, "build");

        // Initialize middlewares
        this.setupMiddlewares();
    }

    private setupMiddlewares(): void {
        // Create the Qwik City Node middleware
        const { router, notFound } = createQwikCity({
            render,
            qwikCityPlan,
            manifest
        });

        // Static asset handlers
        // https://expressjs.com/en/starter/static-files.html
        this.app.use(`/build`, express.static(this.buildDir, { immutable: true, maxAge: "1y" }));
        this.app.use(express.static(this.distDir, { redirect: false }));

        // Use Qwik City's page and endpoint request handler
        this.app.use(router);

        // Use Qwik City's 404 handler
        this.app.use(notFound);
    }

    public start(): void {
        // Start the express server
        // https://expressjs.com/
        this.app.listen(this.PORT, () => {
            /* eslint-disable */
            console.log(`Server started: http://localhost:${this.PORT}/`);
        });
    }
}
