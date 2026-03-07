const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(process.cwd(), 'v2', 'public', 'projects');

const images = [
    { src: 'nutriflow.png', dest: 'nutriflow.webp' },
    { src: 'JegStudio.png', dest: 'jegstudio.webp' },
    { src: 'sportbar-league-captura.png', dest: 'sportbarleague.webp' },
    { src: 'taller-demo.png', dest: 'tallercardonal.webp' },
];

async function optimizeImages() {
    for (const img of images) {
        const srcPath = path.join(publicDir, img.src);
        const destPath = path.join(publicDir, img.dest);

        if (fs.existsSync(srcPath)) {
            await sharp(srcPath)
                .webp({ quality: 80 })
                .toFile(destPath)
                .then(info => console.log('Optimized:', img.dest, info))
                .catch(err => console.error('Error optimizing:', img.src, err));
        } else {
            console.log('Source file not found:', srcPath);
        }
    }
}

optimizeImages();
