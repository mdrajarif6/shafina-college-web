const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const APK_VERSION_FILE = path.join(__dirname, '../apk-version.json');
const ANDROID_DIR = path.join(__dirname, '../android-app');
const GRADLE_FILE = path.join(ANDROID_DIR, 'app/build.gradle');
const PUBLIC_DIR = path.join(__dirname, '../public');

// Read current version
let versionData = JSON.parse(fs.readFileSync(APK_VERSION_FILE, 'utf8'));

// Bump version (incrementing patch version for simplicity)
let [major, minor, patch] = versionData.versionName.split('.').map(Number);
patch += 1;
versionData.versionCode += 1;
versionData.versionName = `${major}.${minor}.${patch}`;
versionData.filename = `HJSWC-College-App-v${versionData.versionName}.apk`;

console.log(`Bumping APK version to ${versionData.versionName} (Code: ${versionData.versionCode})...`);

// Write new version back to json
fs.writeFileSync(APK_VERSION_FILE, JSON.stringify(versionData, null, 2));

// Unfortunately, our scaffolding was empty-activity which sometimes has slightly different gradle layouts.
// But we can simply rely on the default outputs or dynamically modify the build file if needed.
// However, since we just need the file correctly named, let's run Gradle and then just rename the output!

try {
    console.log('Running Gradle assembleDebug...');
    // Make sure JAVA_HOME is set in your environment if needed
    execSync('.\\gradlew assembleDebug', { 
        cwd: ANDROID_DIR, 
        stdio: 'inherit',
        env: { ...process.env, JAVA_HOME: 'C:\\Program Files\\Microsoft\\jdk-17.0.19.10-hotspot' }
    });

    const outputApk = path.join(ANDROID_DIR, 'app/build/outputs/apk/debug/app-debug.apk');
    const finalApk = path.join(PUBLIC_DIR, versionData.filename);

    if (fs.existsSync(outputApk)) {
        // First delete old apks in public dir
        const publicFiles = fs.readdirSync(PUBLIC_DIR);
        publicFiles.forEach(f => {
            if (f.endsWith('.apk')) {
                fs.unlinkSync(path.join(PUBLIC_DIR, f));
            }
        });

        // Copy new apk
        fs.copyFileSync(outputApk, finalApk);
        console.log(`✅ Success! New APK generated at: ${finalApk}`);
    } else {
        console.error('❌ Could not find output APK from Gradle!');
    }
} catch (error) {
    console.error('❌ Build failed:', error);
}
