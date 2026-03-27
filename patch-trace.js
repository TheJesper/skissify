const fs = require('fs');
const orig = fs.writeFileSync;
fs.writeFileSync = function(path, data) {
  if (data === undefined) {
    console.error('=== writeFileSync undefined data ===');
    console.error('path:', path);
    console.error(new Error('stack').stack);
    process.exit(1);
  }
  return orig.apply(this, arguments);
};
