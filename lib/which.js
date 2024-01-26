const path = require('./path')

module.exports = function (version) {
  const versionNumber = version.replace('v', '')
  console.log(path.versionDir + '\\' + versionNumber)
}
