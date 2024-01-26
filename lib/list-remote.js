const fetch = require('node-fetch');

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

function latestVersion(versions) {
  return versions[0]
}

function ltsVersion(versions) {
  return versions.find(version => version.lts !== false)
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