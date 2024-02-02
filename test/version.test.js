const { latestVersion, ltsVersion } = require('../lib/version')
const versionListJson = require('./versions.json')

test('return latest version', () => {
    expect(latestVersion(versionListJson).version).toBe("v21.6.1");
});

test('return lts version', () => {
    expect(ltsVersion(versionListJson).version).toBe("v20.11.0");
});
