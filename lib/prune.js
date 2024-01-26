const fs = require('fs');
const { execSync } = require('child_process');
const path = require('./path')

function getInstalledVersion() {
  const stdout = execSync('node -v')
  return stdout.toString().trim()
}

module.exports = function () {
  const installedVersion = getInstalledVersion()
  const installedVersionNumber = installedVersion.replace('v', '')

  fs.readdir(path.versionDir, (_ , versions) => {
    versions.forEach(version => {
      if (version != installedVersionNumber) {
        fs.rm(path.versionDir + '\\' + version, { recursive: true }, err => {
          if (err) {
            throw err
          }
          console.log(`${path.versionDir + '\\' + version} is deleted.`)
        })
      }
    })
  })
}
