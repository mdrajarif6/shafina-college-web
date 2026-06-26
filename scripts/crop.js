import { Jimp } from 'jimp';

async function cropImage() {
    try {
        console.log("Reading image...");
        const image = await Jimp.read('public/college-logo.jpg');
        console.log("Auto-cropping image borders...");
        // Auto-crop uniform borders with a small tolerance
        image.autocrop();
        await image.write('public/college-logo.png');
        console.log("Cropped image saved as college-logo.png");
    } catch (e) {
        console.error("Error cropping image:", e);
    }
}
cropImage();
