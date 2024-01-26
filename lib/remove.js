const fs = require('fs');
const path = require('./path')

function isExistsLocalVersion(version) {
  const versionNumber = version.replace('v', '');;
  return fs.existsSync(path.versionDir + '\\' + versionNumber)
}

module.exports = function (versions) {
  if (versions.length > 0) {
    versions.forEach(version => {
      if (isExistsLocalVersion(version)) {
        const versionNumber = version.replace('v', '');;
        fs.rm(path.versionDir + '\\' + versionNumber, { recursive: true }, err => {
          if (err) {
            throw err
          }
          console.log(`${path.versionDir + '\\' + versionNumber} is deleted.`)
        })
      }
    });
  }
}
