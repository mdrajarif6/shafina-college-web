import * as ftp from "basic-ftp";
import * as dotenv from "dotenv";

dotenv.config();

async function uploadDbConnect() {
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

        console.log("Connected successfully! Uploading api/db_connect.php...");
        await client.cd("/api");
        await client.uploadFrom("c:/xampp/htdocs/api/db_connect.php", "db_connect.php");
        console.log("Upload of api/db_connect.php complete!");
        
    } catch (err) {
        console.error("Deployment failed:", err);
    }
    client.close();
}

uploadDbConnect();
