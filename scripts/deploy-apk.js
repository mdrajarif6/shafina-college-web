import * as ftp from "basic-ftp";
import * as dotenv from "dotenv";

dotenv.config();

async function uploadApk() {
    const client = new ftp.Client();
    client.ftp.verbose = true;

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

        console.log("Connected successfully! Uploading HJSWC-College-App-v1.0.6.apk...");
        await client.cd("/");
        await client.uploadFrom("c:/xampp/htdocs/public/HJSWC-College-App-v1.0.6.apk", "HJSWC-College-App-v1.0.6.apk");
        console.log("Upload of APK complete!");
        
    } catch (err) {
        console.error("Deployment failed:", err);
    }
    client.close();
}

uploadApk();
