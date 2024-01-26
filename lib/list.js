const fs = require('fs');
const path = require('./path')

module.exports = function () {
  fs.readdir(path.versionDir, (err, items) => {
    for (var i = 0; i < items.length; i++) {
      console.log(items[i]);
    }
  });
}
