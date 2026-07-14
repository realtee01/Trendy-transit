const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

content = content.replace(/<a\b/g, '<button type="button"');

fs.writeFileSync('src/App.tsx', content);
