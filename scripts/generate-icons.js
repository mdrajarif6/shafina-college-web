import { Jimp } from 'jimp';

async function generateIcons() {
    try {
        console.log("Reading image...");
        const image = await Jimp.read('public/college-logo.png');
        
        console.log("Generating 192x192 icon...");
        const img192 = image.clone();
        img192.resize({ w: 192, h: 192 });
        await img192.write('public/pwa-192x192.png');
        
        console.log("Generating 512x512 icon...");
        const img512 = image.clone();
        img512.resize({ w: 512, h: 512 });
        await img512.write('public/pwa-512x512.png');
        
        console.log("Generating apple-touch-icon (180x180)...");
        const img180 = image.clone();
        img180.resize({ w: 180, h: 180 });
        // Apple requires solid background, but PNG works for most setups. We can add white bg if needed, 
        // but white logo on transparent bg often needs a background. We will just use the transparent one.
        await img180.write('public/apple-touch-icon.png');
        
        console.log("All PWA icons generated successfully.");
    } catch (e) {
        console.error("Error generating icons:", e);
    }
}
generateIcons();
