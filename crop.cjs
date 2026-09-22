const Jimp = require('jimp');

async function crop() {
    try {
        const img = await Jimp.read('public/logo.png');
        img.autocrop();
        await img.writeAsync('public/logo.png');
        console.log('Successfully cropped logo.png');
    } catch(err) {
        console.error(err);
    }
}
crop();
