function latestVersion(versions) {
  return versions[0];
};

function ltsVersion(versions) {
  return versions.find((version) => version.lts !== false);
};

module.exports = {
    latestVersion,
    ltsVersion
}