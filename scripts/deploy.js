import * as ftp from "basic-ftp";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function deploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true; // See detailed logs

    const host = "ftp.shafinacollege.online";
    const user = "github@shafinacollege.online";
    const password = process.env.FTP_PASSWORD;

    if (!password) {
        console.error("ERROR: FTP_PASSWORD is not set in your .env file!");
        process.exit(1);
    }

    try {
        console.log(`Connecting to ${host} as ${user}...`);
        await client.access({
            host: host,
            user: user,
            password: password,
            secure: false
        });

        console.log("Connected successfully! Uploading the /dist folder...");
        
        // Ensure we are uploading into the dist folder on the server
        await client.ensureDir("dist");
        await client.clearWorkingDir();
        await client.uploadFromDir("dist");
        
        console.log("Upload complete! /dist folder is synced.");

        // Now upload the /api folder
        console.log("Uploading the /api folder...");
        await client.cd("/");
        await client.ensureDir("api");
        await client.clearWorkingDir();
        await client.uploadFromDir("api");
        
        console.log("Deployment fully completed successfully!");
        
    } catch (err) {
        console.error("Deployment failed:", err);
    }
    client.close();
}

deploy();
