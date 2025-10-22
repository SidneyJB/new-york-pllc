const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateFavicon() {
  const svgPath = path.join(__dirname, '../public/favicon.svg');
  const icoPath = path.join(__dirname, '../public/favicon.ico');

  try {
    // Convert SVG to PNG buffer
    const pngBuffer = await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toBuffer();

    // Write the PNG buffer to favicon.ico
    // Modern browsers will handle PNG favicons just fine
    fs.writeFileSync(icoPath, pngBuffer);

    console.log('Favicon generated successfully!');
  } catch (error) {
    console.error('Error generating favicon:', error);
  }
}

generateFavicon();
