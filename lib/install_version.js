const https = require('https');
const fs = require('fs');
const fetch = require('node-fetch');
const { exec } = require('child_process');
const path = require('./path')
const AdmZip = require('adm-zip');

const downloadUrl = "https://nodejs.org/dist/"
const versionsUrl = 'https://nodejs.org/dist/index.json'

async function getVersions() {
  const response = await fetch(versionsUrl);
  const versions = await response.json();
  return versions
}

async function getLatestVersion() {
  const versions = await getVersions();
  return versions[0].version
}

async function getLtsVersion() {
  const versions = await getVersions();
  const ltsVersion = versions.find(version => version.lts !== false);
  return ltsVersion.version
}

function installVersion(version) {
  if (!version.match(/v/)) {
    version = 'v' + version
  }
  const versionNumber = version.replace('v', '')
  const versionName = "node-" + version + "-win-x64"
  const zipFilename = versionName + ".zip"

  console.log("installing: node-" + version)

  downloadVersion(version, () => {
    const zip = new AdmZip(zipFilename)
    zip.extractAllToAsync(path.versionDir, true, true, (err) => {
      if (err) throw err

      fs.rename(path.versionDir + '\\' + versionName, path.versionDir + '\\' + versionNumber, (err) => {
        if (err) throw err
        console.log('Installed: ' + version + ' to ' + path.versionDir)

        relink(versionNumber)
      })
    })
  })
}

function downloadVersion(version, callback) {
  const versionName = "node-" + version + "-win-x64"
  const zipFilename = versionName + ".zip"
  
  console.log("fetch: " + downloadUrl + version + "/" + zipFilename);
  
  const request = https.get(downloadUrl + version + "/" + zipFilename, function (response) {
    const filestream = fs.createWriteStream(versionName + ".zip");
    response.pipe(filestream)

    filestream.on("finish", () => {
      filestream.close();
      callback()
    });
  });

  request.on('error', function (e) {
    console.log("error: ", e);
  })

  request.setTimeout(120000);

  request.on('timeout', function () {
    console.log('request timed out');
  });
}

function isExistsLocalVersion(version) {
  const versionNumber = version.replace('v', '');;
  return fs.existsSync(path.versionDir + '\\' + versionNumber)
}

function removeLink(callback) {
  const command = 'rmdir ' + path.binDir
  exec(command, function (err, stdout, stderr) {
    callback(err)
  });
}

function switchVersion(version) {
  if (isExistsLocalVersion(version)) {
    relink(version)
  } else {
    installVersion(version)
  }
}

function makeLink(version) {
  const makeLinkCommand = "mklink /D"
  const versionNumber = version.replace('v', '');;
  const command = makeLinkCommand + " " + path.binDir + " " + path.versionDir + "\\" + versionNumber
  exec(command, function (err, stdout, stderr) {
    if (err) {
      console.log(err);
    }
  });
}

function relink(version) {
  removeLink((err) => {
    if (err) {
      console.log(err)
    } else {
      makeLink(version)
    }
  })
}

module.exports = function (version) {
  if (/^[v]{0,1}[0-9]+(\.[0-9]+){0,2}$/.test(version)) {
    switchVersion(version)
  } else if (version === 'latest') {
    getLatestVersion().then((version) => {
      switchVersion(version)
    })
  } else if (version === 'lts') {
    getLtsVersion().then((version) => {
      switchVersion(version)
    })
  }
}