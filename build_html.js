const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Execute o build do Vite
console.log('Construindo o projeto...');
try {
  execSync('npm run build', { stdio: 'inherit' });
} catch (error) {
  console.error('Erro ao construir o projeto:', error);
  process.exit(1);
}

console.log('Projeto construído com sucesso!');

// Caminho para a pasta dist e arquivo HTML
const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');
const outputHtmlPath = path.join(__dirname, 'ruralidades.html');

// Verifique se o arquivo index.html existe
if (!fs.existsSync(indexHtmlPath)) {
  console.error('Arquivo index.html não encontrado na pasta dist!');
  process.exit(1);
}

// Leia o conteúdo do arquivo index.html
let htmlContent = fs.readFileSync(indexHtmlPath, 'utf8');

// Liste todos os arquivos JS e CSS da pasta dist
const jsFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(file => file.endsWith('.js'));
const cssFiles = fs.readdirSync(path.join(distDir, 'assets')).filter(file => file.endsWith('.css'));

// Substitua os links para arquivos JS e CSS por conteúdo inline
for (const jsFile of jsFiles) {
  const jsFilePath = path.join(distDir, 'assets', jsFile);
  const jsContent = fs.readFileSync(jsFilePath, 'utf8');
  htmlContent = htmlContent.replace(
    new RegExp(`<script [^>]*src=\"/assets/${jsFile}\"[^>]*></script>`),
    `<script>${jsContent}</script>`
  );
}

for (const cssFile of cssFiles) {
  const cssFilePath = path.join(distDir, 'assets', cssFile);
  const cssContent = fs.readFileSync(cssFilePath, 'utf8');
  htmlContent = htmlContent.replace(
    new RegExp(`<link [^>]*href=\"/assets/${cssFile}\"[^>]*>`),
    `<style>${cssContent}</style>`
  );
}

// Criar pasta para imagens
const imageDir = path.join(distDir, 'images');
if (fs.existsSync(imageDir)) {
  // Embed images as base64
  const embedImage = (src) => {
    try {
      // Get image path from src
      const imgPath = src.replace(/\"/g, '').replace(/^\.\/images\//, '');
      const fullPath = path.join(imageDir, imgPath);
      
      if (fs.existsSync(fullPath)) {
        const imgContent = fs.readFileSync(fullPath);
        const imgExt = path.extname(fullPath).substring(1); // Remove the dot
        const base64 = imgContent.toString('base64');
        return `data:image/${imgExt};base64,${base64}`;
      }
      return src;
    } catch (e) {
      console.warn(`Couldn't embed image ${src}:`, e);
      return src;
    }
  };
  
  // Find and replace all image references
  htmlContent = htmlContent.replace(/src=\"\.\/images\/[^\"]+\"/g, (match) => {
    const src = match.substring(5, match.length - 1); // Remove src=" and "
    return `src=\"${embedImage(src)}\"`;
  });
  
  // Also look for image URLs in CSS
  htmlContent = htmlContent.replace(/url\(\.\/(images\/[^\)]+)\)/g, (match, imgPath) => {
    return `url(${embedImage(`./${imgPath}`)})`;  
  });
}

// Escreva o conteúdo combinado no arquivo HTML de saída
fs.writeFileSync(outputHtmlPath, htmlContent);

console.log(`Arquivo HTML autônomo gerado com sucesso: ${outputHtmlPath}`);
