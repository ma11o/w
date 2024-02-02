const fetch = require('node-fetch');
const { latestVersion, ltsVersion } = require('./version')

const versionUrl = 'https://nodejs.org/dist/index.json'

async function getVersions() {
  const response = await fetch(versionUrl)
  return await response.json()
}

function matchVersions(versions, number) {
  return versions.filter((version) => {
    const majorVersion = version.version.split('.')[0]
    return (majorVersion.indexOf(number) > -1)
  });
}

function displayVersions(versions) {
  versions.forEach(version => {
    displayVersion(version)
  });
}

function displayVersion(version) {
  console.log(version.version.replace('v', ''))
}

module.exports = async function (arg) {
  const versions = await getVersions()

  if (arg === 'latest') {
    displayVersion(latestVersion(versions))
  } else if (arg === 'lts') {
    displayVersion(ltsVersion(versions))
  } else {
    displayVersions(matchVersions(versions, arg))
  }
}