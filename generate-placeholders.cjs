const fs = require('fs');
const path = require('path');

// Un WebP transparente de 1x1 píxel válido y optimizable por Next.js
const webpBase64 = 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
const webpBuffer = Buffer.from(webpBase64, 'base64');

const dirs = [
    'v2/public/projects',
    'v2/public/images'
];

dirs.forEach(dir => {
    const fullPath = path.resolve(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
});

const files = [
    'v2/public/projects/nutriflow.webp',
    'v2/public/projects/team-hours.webp',
    'v2/public/projects/ecommerce.webp',
    'v2/public/projects/legacy-cv.webp',
    'v2/public/images/placeholder.webp'
];

files.forEach(file => {
    fs.writeFileSync(path.resolve(__dirname, file), webpBuffer);
});

console.log('Placeholders WebP generados con éxito.');
