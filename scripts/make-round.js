
import { Jimp } from 'jimp';
async function makeRound() {
  try {
    const image = await Jimp.read('public/college-logo.png');
    image.circle();
    await image.write('public/college-logo-round.png');
    console.log('Successfully made round logo');
  } catch (err) {
    console.error(err);
  }
}
makeRound();

