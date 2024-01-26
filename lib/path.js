const homeDir = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"]
const nodeDir = homeDir + '\\.node'
const versionDir = nodeDir + '\\versions'
const binDir = nodeDir + '\\bin'

module.exports = {
  versionDir: versionDir,
  binDir: binDir
}

