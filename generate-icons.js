const fs = require('fs');
const path = require('path');

// SVG icon template
const createSVGIcon = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#7133F5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#A5A9D9;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad1)"/>
  <g transform="translate(${size * 0.25}, ${size * 0.25})">
    <path d="M${size * 0.15} ${size * 0.15} L${size * 0.35} ${size * 0.05} L${size * 0.35} ${size * 0.25} L${size * 0.45} ${size * 0.15} L${size * 0.45} ${size * 0.35} L${size * 0.25} ${size * 0.45} L${size * 0.05} ${size * 0.35} L${size * 0.15} ${size * 0.25} Z" fill="white" opacity="0.9"/>
    <circle cx="${size * 0.1}" cy="${size * 0.4}" r="${size * 0.03}" fill="white"/>
    <circle cx="${size * 0.4}" cy="${size * 0.1}" r="${size * 0.03}" fill="white"/>
  </g>
</svg>`;

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

console.log('Generating app icons...');

sizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const svgPath = path.join(__dirname, 'public', 'icons', `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgPath, svgContent);
  console.log(`Created: icon-${size}x${size}.svg`);
});

console.log('✅ All icons generated successfully!');
console.log('Note: For production, convert SVG icons to PNG format using a tool like ImageMagick or online converters');