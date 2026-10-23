const fs = require('fs');
const path = require('path');

class ConfigLoader {
    constructor(filePath) {
        this.filePath = filePath;
    }

    load() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('Failed to load config:', err.message);
            return {};
        }
    }
}

function processItems(items) {
    const seen = new Set();
    const result = [];
    for (const item of items) {
        const norm = item.trim().toLowerCase();
        if (norm && !seen.has(norm)) {
            seen.add(norm);
            result.push(norm);
        }
    }
    return result;
}

const loader = new ConfigLoader(path.join(__dirname, 'config.json'));
const config = loader.load();
const processed = processItems(config.items || []);
console.log(`Processed ${processed.length} items.`);
