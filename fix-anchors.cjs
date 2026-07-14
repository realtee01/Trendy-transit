const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// replace <a href="#..." with <button type="button"
content = content.replace(/<a\s+[^>]*href="#[^>]*>/g, (match) => {
  return match.replace('<a ', '<button type="button" ').replace(/href="#[^"]*"/, '');
});
content = content.replace(/<\/a>/g, '</button>');

fs.writeFileSync('src/App.tsx', content);
console.log('Anchors fixed');
